import React, { useState, useEffect } from 'react';
import { server } from '../../lib/api';
import {
  Listing,
  ListingData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';

interface Props {
  title: string;
}

const LISTINGS_QUERY = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING_MUTATION = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
    }
  }
`;

export const Listings = ({ title }: Props) => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    queryListings();
  }, []);

  const queryListings = async () => {
    const { data } = await server.fetch<ListingData>({
      query: LISTINGS_QUERY,
    });
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING_MUTATION,
      variables: {
        id,
      },
    });
    queryListings();
  };

  const listingsList = listings?.map((listing) => {
    return (
      <li key={listing.id}>
        {listing.title}{' '}
        <button onClick={() => deleteListing(listing.id)}>Delete</button>
      </li>
    );
  });
  return (
    <div>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
    </div>
  );
};

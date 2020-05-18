import React from 'react';
import { server } from '../../lib/api';

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

export const Listings = ({ title }: Props) => {
  const queryListings = async () => {
    try {
      const listings = await server.fetch({ query: LISTINGS_QUERY });
      console.log(listings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={queryListings}>Query Listings</button>
    </div>
  );
};

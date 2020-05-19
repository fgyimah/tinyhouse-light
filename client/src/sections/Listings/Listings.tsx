import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { List, Avatar, Button, Spin } from 'antd';
import { Listings as ListingData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import { ListingsSkeleton } from './components';
import './styles/Listings.css';

interface Props {
  title: string;
}

const LISTINGS_QUERY = gql`
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

const DELETE_LISTING_MUTATION = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
    }
  }
`;

export const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingData>(
    LISTINGS_QUERY
  );

  const [
    deleteListing,
    { error: deletionError, loading: deletionLoading },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(
    DELETE_LISTING_MUTATION
  );

  const deleteListingRequest = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data?.listings;

  if (loading) {
    return <ListingsSkeleton title="TinyHouse Listings" />;
  }

  if (error) {
    return <h1>Something went wrong...please try again later!</h1>;
  }
  const deletionErrorMessage = deletionError ? (
    <h1>Failed to delete...</h1>
  ) : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => deleteListingRequest(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} size={48} shape="square" />}
          />
        </List.Item>
      )}
    ></List>
  ) : null;
  return (
    <div className="listings">
      <Spin spinning={deletionLoading}>
        <h2>{title}</h2>
        <ul>{listingsList}</ul>
        {deletionErrorMessage}
      </Spin>
    </div>
  );
};

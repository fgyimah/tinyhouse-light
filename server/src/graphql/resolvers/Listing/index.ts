import { IResolvers } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { Database, Listing } from '../../../lib/types';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find().toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      {
        db,
      }: {
        db: Database;
      }
    ): Promise<Listing> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectID(id),
      });

      if (!deleteResult.value) {
        throw new Error('Deletion unsuccesful');
      }
      return deleteResult.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};

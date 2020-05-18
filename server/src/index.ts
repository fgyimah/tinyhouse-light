require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const mount = async (app: Application) => {
  const db = await connectDatabase();
  //create a base apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: '/api' });

  const port = process.env.PORT;
  app.listen(port, () => console.log(`[app]: http://localhost:${port}`));
};

mount(express());

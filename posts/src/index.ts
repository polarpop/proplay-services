import "reflect-metadata";
import { Post, Category } from './entity';
import { User } from './graphql/User';
import { buildFederatedSchema } from '@proplay/utils';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { UserResolver, PostResolver } from './resolvers';
import { resolvePostReference, resolveCategoryReference } from './referenceResolvers';

const port = process.env.APOLLO_SERVER_PORT || 3001

async function bootstrap(connection: any) {
  const schema = await buildFederatedSchema({
    resolvers: [ UserResolver, PostResolver ],
    orphanedTypes: [ User, Post, Category ],
    container: Container
  }, {
    Post: { __resolveReference: resolvePostReference },
    Category: { __resolveReference: resolveCategoryReference }
  });

  const server = new ApolloServer({
    schema,
    tracing: true,
    playground: true
  });

  return await server.listen({ port })
}

useContainer(Container)
createConnection()
  .then(bootstrap)
  .catch(err => console.log(err));
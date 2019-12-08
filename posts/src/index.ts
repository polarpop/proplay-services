import "reflect-metadata";
import { Post, Category } from './entity';
import { User } from './graphql/User';
import { server as config } from './config';
import { UserMetaModel } from './models';
import { user as userBroker, service as serviceBroker } from './brokers';
import { buildFederatedSchema } from '@proplay/utils';
import { context as createContext } from '@proplay/context';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { UserResolver, PostResolver } from './resolvers';
import { resolvePostReference, resolveCategoryReference } from './referenceResolvers';

const { hostname, protocol, tracing, playground, port, name } = config;

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
    tracing,
    playground,
    context: createContext<UserMetaModel>({ broker: userBroker })
  });

  const { url } = await server.listen({ port, hostname, protocol });
  const def = { url, name };
  await serviceBroker.set(def, { keyId: 'name' });
  return url;
}

useContainer(Container)
createConnection()
  .then(bootstrap)
  .catch(err => console.log(err));
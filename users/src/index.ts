import "reflect-metadata";
import { ServiceDefinition } from '@apollo/federation';
import { context as createContext } from '@proplay/context';
import { Post } from './graphql';
import { User } from './entity';
import { buildFederatedSchema } from '@proplay/utils';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { UserResolver, PostResolver } from './resolvers';
import { resolveUserReference } from './referenceResolvers';
import { service as broker, user as userBroker } from './brokers';


const port = process.env.APOLLO_SERVER_PORT || 3002

async function bootstrap(connection: any) {
  const schema = await buildFederatedSchema({
    resolvers: [ UserResolver, PostResolver ],
    orphanedTypes: [ User, Post ],
    container: Container
  }, {
    User: { __resolveReference: resolveUserReference },
  });

  const server = new ApolloServer({
    schema,
    tracing: true,
    playground: true,
    context: createContext<User>({ broker: userBroker })
  });

  const { url } = await server.listen({ port });
  const def = { url, name: 'users' };
  await broker.set(def, { keyId: 'name' });
  return url;
}

useContainer(Container)
createConnection()
  .then(bootstrap)
  .catch(err => console.log(err));
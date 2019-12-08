import "reflect-metadata";
import { ServiceDefinition } from '@apollo/federation';
import { context as createContext } from '@proplay/context';
import { Post } from './graphql';
import { User } from './entity';
import { buildFederatedSchema } from '@proplay/utils';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { UserResolver, PostResolver, AuthResolver } from './resolvers';
import { resolveUserReference } from './referenceResolvers';
import { service as broker, user as userBroker } from './brokers';
import { server as config } from './config';

const { port, hostname, protocol, tracing, playground, name } = config;


async function bootstrap(connection: any) {
  const schema = await buildFederatedSchema({
    resolvers: [ UserResolver, PostResolver, AuthResolver ],
    orphanedTypes: [ User, Post ],
    container: Container
  }, {
    User: { __resolveReference: resolveUserReference },
  });

  const server = new ApolloServer({
    schema,
    tracing,
    playground,
    context: createContext<User>({ broker: userBroker })
  });

  const { url } = await server.listen({ port, hostname, protocol });
  const def = { url, name };
  await broker.set(def, { keyId: 'name' });
  return url;
}

useContainer(Container)
createConnection()
  .then(bootstrap)
  .catch(err => console.log(err));
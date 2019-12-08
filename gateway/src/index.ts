import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { context as createContext } from '@proplay/context'; 
import { buildServiceList } from './utils';
import { AuthenticatedDataSource } from './datasource';
import { user as userBroker } from './brokers';
import { User } from './models';
import { server as config } from './config';

const { playground, tracing, cors, engine, port, hostname, protocol } = config;


async function bootstrap(): Promise<any> {
  const serviceList = await buildServiceList();

  const gateway = new ApolloGateway({
    serviceList,
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    }
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    tracing,
    engine,
    cors,
    context: createContext<User>({ broker: userBroker })
  });

  return await server.listen({ hostname, protocol, port });
}

bootstrap()
  .then(({ url }) => {
    console.log(`Listening at ${url}`)
  })
  .catch((err) => console.log(err));



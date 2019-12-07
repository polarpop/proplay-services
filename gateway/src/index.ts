import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { buildServiceList } from './utils';
import { AuthenticatedDataSource } from './datasource';
import { createContext as context } from './context';



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
    tracing: true,
    engine: true,
    cors: true,
    context
  });

  return await server.listen();
}

bootstrap()
  .then(({ url }) => {
    console.log(`Listening at ${url}`)
  })
  .catch((err) => console.log(err));



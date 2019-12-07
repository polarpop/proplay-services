import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: any) {
    if (context.user) {
      request.http.headers.set('X-USER-ID', context.user.id);
    }
  }
}
import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { buildSchema } from 'type-graphql';
import { ObjectIdScalar } from './utils/object-id.scalar';
import { ContinentResolver } from './resolvers/continent-resolver';
import { CountryResolver } from './resolvers/country-resolver';
import { RegionResolver } from './resolvers/region-resolver';
import { SurfspotResolver } from './resolvers/surfspot-resolver';
import { ForecastResolver } from './resolvers/forecast-resolver';
import { UserResolver } from './resolvers/user-resolver';

import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { connect, set } from 'mongoose';
import http from 'http';
import { MONGODB_URI, SECRET, PORT } from './utils/config';
import { loggerInfo, loggerError } from './utils/logger';
import jwt from 'jsonwebtoken';
import { UserModel as User } from './entities/user';

set('useFindAndModify', false);
set('useCreateIndex', true);

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ContinentResolver,
      CountryResolver,
      RegionResolver,
      SurfspotResolver,
      ForecastResolver,
      UserResolver,
    ],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    dateScalarMode: 'timestamp',
    emitSchemaFile: true,
    validate: false,
  });
  console.log(MONGODB_URI);
  const mongoose = await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection;

  type Req = { req: http.IncomingMessage };

  interface Token {
    id: string;
  }

  const server = new ApolloServer({
    schema,
    context: async ({ req }: Req) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), SECRET) as Token;

        const currentUser = await User.findById(decodedToken.id);

        return { currentUser };
      }
      return null;
    },
  });
  const app = express();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    loggerInfo(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
main().catch((error) => {
  loggerError(error);
});

import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import mongoose from 'mongoose';
import http from 'http';
import { MONGODB_URI, SECRET, PORT } from './utils/config';
import { loggerInfo, loggerError } from './utils/logger';
import resolvers from './resolvers/';
import jwt from 'jsonwebtoken';
import { User } from './models/user';
import { DecodedToken } from './types';
import { typeDef as Continent } from './schema/continent';
import { typeDefs as Country } from './schema/country';
import { typeDefs as Forecast } from './schema/forecast';
import { typeDefs as Region } from './schema/region';
import { typeDefs as SurfSpot } from './schema/surfspot';
import { typeDefs as UserSchema } from './schema/user';
import { typeDefs as Query } from './schema/query';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    loggerInfo('connected to MongoDB');
  })
  .catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    loggerError('error connection to MongoDB: ', error.message);
  });

type Req = { req: http.IncomingMessage };

const schema = makeExecutableSchema({
  typeDefs: [Continent, Country, Forecast, Region, SurfSpot, UserSchema, Query],
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

const server = new ApolloServer({
  schema,
  context: async ({ req }: Req) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        SECRET
      ) as DecodedToken;

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
    return null;
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

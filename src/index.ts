import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import http from 'http';
import { MONGODB_URI, SECRET, PORT } from './utils/config';
import { loggerInfo, loggerError } from './utils/logger';
import typeDefs from './schemas';
import resolvers from './resolvers';
import jwt from 'jsonwebtoken';
import { User } from './models/users';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: Req) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
    return null;
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

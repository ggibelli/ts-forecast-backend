import { IContinentDoc, ContinentModel, IContinent } from '../models/continent';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Continent {
    _id: ID!
    name: String!
    countries: [Country!]
    latitude: String!
    longitude: String!
  }

  type Country {
    _id: ID!
    name: String!
    continent: Continent!
    latitude: String!
    longitude: String!
  }

  type Query {
    continents: [Continent!]
  }
`;

export const resolvers = {
  Query: {
    continents: async (): Promise<Array<IContinent>> => {
      const cccc = await ContinentModel.find({});
      console.log(cccc);
      return cccc;
    },
  },
};

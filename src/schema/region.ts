import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Region {
    _id: ID!
    name: String!
    continent: Continent!
    country: Country!
    surfspots: [Surfspot!]
    latitude: String!
    longitude: String!
  }

  type Query {
    regions: [Region!]
  }
`;

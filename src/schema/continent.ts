import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Continent {
    _id: ID!
    name: String!
    countries: [Country!]
    latitude: String!
    longitude: String!
  }
`;

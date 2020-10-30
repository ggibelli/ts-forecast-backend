import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Country {
    _id: ID!
    name: String!
    continent: Continent!
    regions: [Region!]
    latitude: String!
    longitude: String!
  }
`;

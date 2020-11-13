import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    passwordHash: String!
    createdSpots: [Surfspot!]
    starredSpots: [Surfspot!]
  }
`;

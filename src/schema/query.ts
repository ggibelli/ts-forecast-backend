import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    continents: [Continent!]
    countries: [Country!]
    regions: [Region!]
    forecasts: [Forecast!]
    surfspots: [Surfspot!]
    users: [User!]
  }
`;

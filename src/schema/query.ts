import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    continents: [Continent!]!
    continent(name: String!): Continent
    countries: [Country!]!
    country(name: String!): Country
    regions: [Region!]!
    region(name: String!): Region
    forecasts: [Forecast!]!
    forecast(name: String!): Forecast
    surfspots(country: String): [Surfspot]
    surfspot(name: String!): Surfspot
    users: [User!]!
    user(_id: String!): User
  }
`;

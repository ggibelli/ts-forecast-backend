import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Surfspot {
    _id: ID!
    name: String!
    continent: Continent!
    country: Country!
    region: Region!
    forecast: Forecast
    latitude: String!
    longitude: String!
    user: User
    type: String
    direction: String
    bottom: String
    good_swell_direction: String
    good_wind_direction: String
    best_tide_position: String
    best_tide_movement: String
    dangers: String
    tile_url: String
    isSecret: Boolean
  }
`;

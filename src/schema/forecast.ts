import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type ForecastData {
    airTemperature: Float
    cloudCover: Float
    precipation: Float
    gust: Float
    secondarySwellDirection: Float
    secondarySwellHeight: Float
    secondarySwellPeriod: Float
    swellDirection: Float
    swellHeight: Float
    swellPeriod: Float
    waterTemperature: Float
    waveDirection: Float
    waveHeight: Float
    wavePeriod: Float
    windDirection: Float
    windSpeed: Float
    windWaveDirection: Float
    windWaveHeight: Float
    windWavePeriod: Float
  }

  interface IForecast {
    time: String!
    data: ForecastData!
  }

  interface ITide {
    time: String!
    type: String!
    height: Float!
  }

  type Forecast {
    _id: ID!
    surfspot: Surfspot!
    forecast: IForecast
    forecastLastRequest: Int!
    tides: ITide
    tidesLastRequest: Int!
  }

  type Query {
    forecasts: [Forecast!]
  }
`;

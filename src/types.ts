import { Forecast } from './models/forecast';

export interface DecodedToken {
  id: string;
  token: string;
}

export interface Forecast {
  airTemperature: number;
  cloudCover: number;
  precipation: number;
  gust: number;
  secondarySwellDirection: number;
  secondarySwellHeight: number;
  secondarySwellPeriod: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waterTemperature: number;
  waveDirection: number;
  waveHeight: number;
  wavePeriod: number;
  windDirection: number;
  windSpeed: number;
  windWaveDirection: number;
  windWaveHeight: number;
  windWavePeriod: number;
}

export interface ForecastType {
  time: string;

  data: Forecast[];
}

export interface TideType {
  time: string;

  type: string;

  height: number;
}

import { config } from 'dotenv';

config();

export const PORT = process.env.PORT as string;
export let MONGODB_URI = process.env.MONGODB_URI as string;
export const SECRET = process.env.SECRET as string;
export const STORMGLASS_API = process.env.API_STORMGLASS as string;
export const TOMTOM_API = process.env.API_TOMTOM as string;
export const WEATHER_API = process.env.API_WEATHER as string;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI as string;
}

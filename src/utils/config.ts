export const PORT = process.env.PORT;
export let MONGODB_URI = process.env.MONGODB_URI;
export const SECRET = process.env.SECRET;
export const STORMGLASS_API = process.env.API_STORMGLASS;
export const TOMTOM_API = process.env.API_TOMTOM;
export const WEATHER_API = process.env.API_WEATHER;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

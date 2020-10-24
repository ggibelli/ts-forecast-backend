/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ISurfSpot } from './surfspot';

mongoose.set('useCreateIndex', true);

export interface IForecast {
  surfspot: mongoose.Types.ObjectId | ISurfSpot;
  forecast: mongoose.Schema.Types.Mixed[];
  forecastLastRequest: number;
  tides: mongoose.Schema.Types.Mixed[];
  tidesLastRequest: number;
}

interface IForecastDoc extends IForecast, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForecastSchemaFields: Record<keyof IForecast, any> = {
  surfspot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurfSpot',
    required: true,
    unique: true,
  },
  forecast: [mongoose.Schema.Types.Mixed],
  forecastLastRequest: Number,
  tides: [mongoose.Schema.Types.Mixed],
  tidesLastRequest: Number,
};

const forecastSchema = new mongoose.Schema(ForecastSchemaFields);

forecastSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.forecastLastRequest;
    delete returnedObject.tidesLastRequest;
  },
});

forecastSchema.plugin(mongooseUniqueValidator);
export const Forecast = mongoose.model<IForecastDoc>(
  'Forecast',
  forecastSchema
);

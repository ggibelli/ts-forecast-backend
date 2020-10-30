/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ISurfSpot } from './surfspot';
import { ForecastType, TideType } from '../types';

mongoose.set('useCreateIndex', true);

export interface IForecast extends Document {
  surfspot: ISurfSpot['_id'];
  forecast?: ForecastType;
  forecastLastRequest?: number;
  tides?: TideType;
  tidesLastRequest?: number;
}

const forecastSchema = new Schema({
  surfspot: {
    type: Schema.Types.ObjectId,
    ref: 'SurfSpot',
    required: true,
    unique: true,
  },
  forecast: Schema.Types.Mixed,
  forecastLastRequest: Number,
  tides: Schema.Types.Mixed,
  tidesLastRequest: Number,
});

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
export const Forecast = mongoose.model<IForecast>('Forecast', forecastSchema);

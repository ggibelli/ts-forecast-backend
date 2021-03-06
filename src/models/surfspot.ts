/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { IContinent } from './continent';
import { ICountry } from './country';
import { IRegion } from './region';
import { IUser } from './user';
import { IForecast } from './forecast';

mongoose.set('useCreateIndex', true);

export interface ISurfSpot extends Document {
  continent: IContinent['_id'];
  country: ICountry['_id'];
  region: IRegion['_id'];
  name: string;
  forecast?: IForecast['_id'];
  type?: string;
  direction?: string;
  bottom?: string;
  good_swell_direction?: string;
  good_wind_direction?: string;
  best_tide_position?: string;
  best_tide_movement?: string;
  dangers?: string;
  latitude: string;
  longitude: string;
  tile_url?: string;
  isSecret: boolean;
  user?: IUser['_id'];
}

const spotSchema = new Schema({
  continent: {
    type: Schema.Types.ObjectId,
    ref: 'Continent',
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  forecast: {
    type: Schema.Types.ObjectId,
    ref: 'Forecast',
  },
  type: String,
  direction: String,
  bottom: String,
  good_swell_direction: String,
  good_wind_direction: String,
  best_tide_position: String,
  best_tide_movement: String,
  dangers: String,
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  tile_url: String,
  isSecret: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

spotSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

spotSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

spotSchema.plugin(mongooseUniqueValidator);

export const SurfSpot = mongoose.model<ISurfSpot>('SurfSpot', spotSchema);

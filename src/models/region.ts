/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { IContinent } from './continent';
import { ICountry } from './country';
import { ISurfSpot } from './surfspot';

mongoose.set('useCreateIndex', true);

export interface IRegion extends Document {
  continent: IContinent['_id'];
  country: ICountry['_id'];
  name: string;
  surfSpots?: Array<ISurfSpot['_id']>;
  latitude: string;
  longitude: string;
}

const regionSchema = new Schema({
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
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  surfSpots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

regionSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

regionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

regionSchema.plugin(mongooseUniqueValidator);
export const Region = mongoose.model<IRegion>('Region', regionSchema);

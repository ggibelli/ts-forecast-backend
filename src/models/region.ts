/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { IContinent } from './continent';
import { ICountry } from './country';
import { ISurfSpot } from './surfspot';

mongoose.set('useCreateIndex', true);

export interface IRegion {
  continent: mongoose.Types.ObjectId | IContinent;
  country: mongoose.Types.ObjectId | ICountry;
  name: string;
  surfSpots: mongoose.Types.ObjectId[] | ISurfSpot[];
  latitude: string;
  longitude: string;
}

interface IRegionDoc extends IRegion, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RegionSchemaFields: Record<keyof IRegion, any> = {
  continent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Continent',
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
};

const regionSchema = new mongoose.Schema(RegionSchemaFields);

regionSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

regionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

regionSchema.plugin(mongooseUniqueValidator);
export const Region = mongoose.model<IRegionDoc>('Region', regionSchema);

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { IContinent } from './continent';
import { IRegion } from './region';

mongoose.set('useCreateIndex', true);

export interface ICountry {
  continent: mongoose.Types.ObjectId | IContinent;
  name: string;
  regions: mongoose.Types.ObjectId[] | IRegion[];
  latitude: string;
  longitude: string;
}

interface ICountryDoc extends ICountry, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CountrySchemaFields: Record<keyof ICountry, any> = {
  continent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Continent',
    required: true,
  },
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  regions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Region',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
};

const countrySchema = new mongoose.Schema(CountrySchemaFields);

countrySchema.index({ latitude: 1, longitude: 1 }, { unique: true });

countrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

countrySchema.plugin(mongooseUniqueValidator);

export const Country = mongoose.model<ICountryDoc>('Country', countrySchema);

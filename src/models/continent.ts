/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ICountry } from './country';

mongoose.set('useCreateIndex', true);

export interface IContinent {
  name: string;
  countries: mongoose.Types.ObjectId[] | ICountry[];
  latitude: string;
  longitude: string;
}

interface IContinentDoc extends IContinent, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContinentFields: Record<keyof IContinent, any> = {
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
};

const continentSchema = new mongoose.Schema(ContinentFields);

continentSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

continentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

continentSchema.plugin(mongooseUniqueValidator);
export const Continent = mongoose.model<IContinentDoc>(
  'Continent',
  continentSchema
);

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ICountry } from './country';

mongoose.set('useCreateIndex', true);

export interface IContinent extends Document {
  name: string;
  countries?: Array<ICountry['_id']>;
  latitude: string;
  longitude: string;
}
const continentSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

continentSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

continentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

continentSchema.plugin(mongooseUniqueValidator);
export const Continent = mongoose.model<IContinent>(
  'Continent',
  continentSchema
);

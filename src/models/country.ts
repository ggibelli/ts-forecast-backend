/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { IContinent } from './continent';
import { IRegion } from './region';

mongoose.set('useCreateIndex', true);

export interface ICountry extends Document {
  continent: IContinent['_id'];
  name: string;
  regions?: Array<IRegion['_id']>;
  latitude: string;
  longitude: string;
}

const countrySchema = new mongoose.Schema({
  continent: {
    type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: 'Region',
    },
  ],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

countrySchema.index({ latitude: 1, longitude: 1 }, { unique: true });

countrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

countrySchema.plugin(mongooseUniqueValidator);

export const Country = mongoose.model<ICountry>('Country', countrySchema);

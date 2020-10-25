/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import { Country } from './country';
import {
  prop,
  getModelForClass,
  index,
  modelOptions,
} from '@typegoose/typegoose';

mongoose.set('useCreateIndex', true);

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  },
})
@index({ name: 1, latitude: 1, longitude: 1 }, { unique: true })
export class Continent {
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @prop({ type: () => [Country] })
  public countries?: Country[];

  @prop({ required: true })
  public latitude!: string;

  @prop({ required: true })
  public longitude!: string;
}

export const ContinentModel = getModelForClass(Continent);

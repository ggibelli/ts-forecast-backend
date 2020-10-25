/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import {
  prop,
  getModelForClass,
  Ref,
  index,
  modelOptions,
} from '@typegoose/typegoose';
import { Continent } from './continent';
import { Country } from './country';
import { SurfSpot } from './surfspot';

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
export class Region {
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @prop({ ref: () => Continent, required: true })
  public continent!: Ref<Continent>;

  @prop({ ref: () => Country, required: true })
  public country!: Ref<Country>;

  @prop({ type: () => [SurfSpot] })
  public surfSpots?: SurfSpot[];

  @prop({ required: true })
  public latitude!: string;

  @prop({ required: true })
  public longitude!: string;
}

export const RegionModel = getModelForClass(Region);

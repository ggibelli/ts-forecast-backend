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
import { Region } from './region';
import { User } from './user';
import { Forecast } from './forecast';

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
export class SurfSpot {
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @prop({ ref: () => Continent, required: true })
  public continent!: Ref<Continent>;

  @prop({ ref: () => Country, required: true })
  public country!: Ref<Country>;

  @prop({ ref: () => Region, required: true })
  public region!: Ref<Region>;

  @prop({ ref: () => Forecast })
  public forecast?: Ref<Forecast>;

  @prop({ ref: () => User })
  public user?: Ref<User>;

  @prop({ required: true })
  public latitude!: string;

  @prop({ required: true })
  public longitude!: string;

  @prop()
  public type?: string;

  @prop()
  public direction?: string;

  @prop()
  public bottom?: string;

  @prop()
  public good_swell_direction?: string;

  @prop()
  public good_wind_direction?: string;

  @prop()
  public best_tide_position?: string;

  @prop()
  public best_tide_movement?: string;

  @prop()
  public dangers?: string;

  @prop()
  public tile_url?: string;

  @prop()
  public isSecret?: boolean;
}

export const SurfSpotModel = getModelForClass(SurfSpot);

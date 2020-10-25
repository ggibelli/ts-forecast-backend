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
import { SurfSpot } from './surfspot';

mongoose.set('useCreateIndex', true);

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.forecastLastRequest;
        delete returnedObject.tidesLastRequest;
      },
    },
  },
})
@index({ surfspot: 1 }, { unique: true })
export class Forecast {
  @prop({ ref: () => SurfSpot, required: true })
  public surfspot!: Ref<SurfSpot>;

  @prop({ type: () => [mongoose.Schema.Types.Mixed] })
  public forecast?: mongoose.Schema.Types.Mixed[];

  @prop({ type: () => [mongoose.Schema.Types.Mixed] })
  public tides?: mongoose.Schema.Types.Mixed[];

  @prop({ required: true })
  public forecastLastRequest!: number;

  @prop({ required: true })
  public tidesLastRequest!: number;
}

export const ForecastModel = getModelForClass(Forecast);

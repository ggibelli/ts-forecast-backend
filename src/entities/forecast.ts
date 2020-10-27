/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ObjectType, Field } from 'type-graphql';
import {
  prop,
  getModelForClass,
  Ref,
  index,
  modelOptions,
  Severity,
  plugin,
} from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import { SurfSpot } from './surfspot';
import { IForecast, ITide } from '../types';

mongoose.set('useCreateIndex', true);

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
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
@ObjectType()
@plugin(autopopulate.default as any)
export class Forecast {
  @Field()
  readonly _id!: ObjectId;

  @Field((_type) => SurfSpot)
  @prop({ autopopulate: true, ref: 'SurfSpot', required: true })
  public surfspot!: Ref<SurfSpot>;

  @Field((_type) => [IForecast])
  @prop({ type: () => [IForecast] })
  public forecast?: IForecast[];

  @Field((_type) => [ITide])
  @prop({ type: () => ITide })
  public tides?: ITide[];

  @Field()
  @prop({ required: true })
  public forecastLastRequest!: Date;

  @Field()
  @prop({ required: true })
  public tidesLastRequest!: Date;
}

export const ForecastModel = getModelForClass(Forecast);

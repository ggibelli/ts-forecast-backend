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
  plugin,
} from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
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
@ObjectType()
@plugin(autopopulate.default as any)
export class Region {
  @Field()
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @Field((_type) => Continent)
  @prop({ autopopulate: true, ref: () => 'Continent', required: true })
  public continent!: Ref<Continent>;

  @Field((_type) => Country)
  @prop({ autopopulate: true, ref: () => 'Country', required: true })
  public country!: Ref<Country>;

  @Field((_type) => [SurfSpot], { nullable: true })
  @prop({ autopopulate: true, ref: () => 'SurfSpot' })
  public surfSpots?: Ref<SurfSpot>[];

  @Field()
  @prop({ required: true })
  public latitude!: string;

  @Field()
  @prop({ required: true })
  public longitude!: string;
}

export const RegionModel = getModelForClass(Region);

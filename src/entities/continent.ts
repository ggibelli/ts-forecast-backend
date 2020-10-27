/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import { Country } from './country';
import { ObjectId } from 'mongodb';
import { ObjectType, Field } from 'type-graphql';
import {
  prop,
  getModelForClass,
  index,
  modelOptions,
  plugin,
  Ref,
} from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';

mongoose.set('useCreateIndex', true);

@plugin(autopopulate.default as any)
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
@ObjectType({ description: 'The continent model' })
export class Continent {
  @Field()
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @Field((_type) => [Country], { nullable: true })
  @prop({ autopopulate: true, ref: 'Country' })
  public countries?: Ref<Country>[];

  @Field()
  @prop({ required: true })
  public latitude!: string;

  @Field()
  @prop({ required: true })
  public longitude!: string;
}

export const ContinentModel = getModelForClass(Continent);

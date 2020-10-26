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
@ObjectType()
export class SurfSpot {
  @Field()
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true, unique: true, minlength: 3 })
  public name!: string;

  @Field((_type) => Continent)
  @prop({ ref: () => 'Continent', required: true })
  public continent!: Ref<Continent>;

  @Field((_type) => Country)
  @prop({ ref: () => 'Country', required: true })
  public country!: Ref<Country>;

  @Field((_type) => Region)
  @prop({ ref: () => 'Region', required: true })
  public region!: Ref<Region>;

  @Field((_type) => Forecast, { nullable: true })
  @prop({ ref: () => 'Forecast' })
  public forecast?: Ref<Forecast>;

  @Field()
  @prop({ required: true })
  public latitude!: string;

  @Field((_type) => User, { nullable: true })
  @prop({ ref: () => 'User' })
  public createdBy?: Ref<User>;

  @Field()
  @prop({ required: true })
  public longitude!: string;

  @Field({ nullable: true })
  @prop()
  public type?: string;

  @Field({ nullable: true })
  @prop()
  public direction?: string;

  @Field({ nullable: true })
  @prop()
  public bottom?: string;

  @Field({ nullable: true })
  @prop()
  public good_swell_direction?: string;

  @Field({ nullable: true })
  @prop()
  public good_wind_direction?: string;

  @Field({ nullable: true })
  @prop()
  public best_tide_position?: string;

  @Field({ nullable: true })
  @prop()
  public best_tide_movement?: string;

  @Field({ nullable: true })
  @prop()
  public dangers?: string;

  @Field({ nullable: true })
  @prop()
  public tile_url?: string;

  @Field({ nullable: true })
  @prop()
  public isSecret?: boolean;
}

export const SurfSpotModel = getModelForClass(SurfSpot);

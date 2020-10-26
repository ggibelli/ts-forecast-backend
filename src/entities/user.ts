/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ObjectType, Field } from 'type-graphql';
import {
  prop,
  getModelForClass,
  index,
  modelOptions,
} from '@typegoose/typegoose';
import { SurfSpot } from './surfspot';

mongoose.set('useCreateIndex', true);

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
      },
    },
  },
})
@index({ username: 1, email: 1 }, { unique: true })
@ObjectType()
export class User {
  @Field()
  readonly _id!: ObjectId;

  @Field((_type) => [SurfSpot], { nullable: true })
  @prop({ type: () => [SurfSpot] })
  public createdSpots?: SurfSpot[];

  @Field((_type) => [SurfSpot], { nullable: true })
  @prop({ type: () => [SurfSpot] })
  public starredSpots?: SurfSpot[];

  @Field()
  @prop({ required: true, unique: true, minlength: 3 })
  public username!: string;

  @Field()
  @prop({ required: true, unique: true, minlength: 3 })
  public email!: string;

  @Field()
  @prop({ required: true })
  public passwordHash!: string;

  @Field({ nullable: true })
  @prop()
  public firstName?: string;

  @Field({ nullable: true })
  @prop()
  public lastName?: string;
}

export const UserModel = getModelForClass(User);

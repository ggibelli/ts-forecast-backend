/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
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
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
      },
    },
  },
})
@index({ username: 1, email: 1 }, { unique: true })
export class User {
  @prop({ required: true, unique: true, minlength: 3 })
  public username!: string;

  @prop({ required: true, unique: true, minlength: 3 })
  public email!: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop({ type: () => [SurfSpot] })
  public createdSpots?: SurfSpot[];

  @prop({ type: () => [SurfSpot] })
  public starredSpots?: SurfSpot[];
}

export const UserModel = getModelForClass(User);

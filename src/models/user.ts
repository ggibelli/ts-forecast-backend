/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { Surfspot } from '../generated/graphql';

mongoose.set('useCreateIndex', true);

export interface IUser extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  starredSpots?: Array<Surfspot['_id']>;
  createdSpots?: Array<Surfspot['_id']>;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  firstName: String,
  lastName: String,
  passwordHash: String,
  starredSpots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
  createdSpots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(mongooseUniqueValidator);

export const User = mongoose.model<IUser>('User', userSchema);

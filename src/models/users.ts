/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

mongoose.set('useCreateIndex', true);

export interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  starredSpots: mongoose.Types.ObjectId[];
  createdSpots: mongoose.Types.ObjectId[];
}

interface IUserDoc extends IUser, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserSchemaFields: Record<keyof IUser, any> = {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
  createdSpots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SurfSpot',
    },
  ],
};

const userSchema = new mongoose.Schema(UserSchemaFields);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(mongooseUniqueValidator);

export const User = mongoose.model<IUserDoc>('User', userSchema);

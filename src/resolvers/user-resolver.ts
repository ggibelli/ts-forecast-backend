import { QueryResolvers, User } from '../generated/graphql';
import { User as UserModel } from '../models/user';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const users: User[] = await UserModel.find({})
        .lean()
        .populate({
          path: 'createdSpots',
          select: ['name', 'isSecret', 'latitude', 'longitude'],
          populate: {
            path: 'country continent region',
            select: 'name',
          },
        })
        .populate({
          path: 'starredSpots',
          select: 'name',
          populate: {
            path: 'country continent region',
            select: 'name',
          },
        });
      return users;
    },

    user: async (_root, { _id }): Promise<User | null> => {
      const user = await UserModel.findById(_id)
        .lean()
        .populate({
          path: 'createdSpots',
          select: ['name', 'isSecret', 'latitude', 'longitude'],
          populate: {
            path: 'country continent region',
            select: 'name',
          },
        })
        .populate({
          path: 'starredSpots',
          select: 'name',
          populate: {
            path: 'country continent region',
            select: 'name',
          },
        });
      if (!user) return null;
      return user;
    },
  },
};

import { QueryResolvers, User } from '../generated/graphql';
import { User as UserModel } from '../models/user';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const users: User[] = await UserModel.find({})
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
        })
        .lean();
      return users;
    },
  },
};

import { QueryResolvers, Continent } from '../generated/graphql';
import { Continent as ContinentModel } from '../models/continent';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    continents: async (): Promise<Continent[]> => {
      const continents: Continent[] = await ContinentModel.find({})
        .populate({
          path: 'countries',
          select: ['name', 'latitude', 'longitude'],
          populate: {
            path: 'regions',
            select: ['name', 'latitude', 'longitude'],
            populate: {
              path: 'surfSpots',
              select: 'name',
              match: { isSecret: false },
            },
          },
        })
        .lean();
      return continents;
    },
  },
};

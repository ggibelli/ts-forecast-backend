import { QueryResolvers, Continent } from '../generated/graphql';
import { Continent as ContinentModel } from '../models/continent';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    continents: async (): Promise<Continent[]> => {
      const continents = await ContinentModel.find({})
        .lean()
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
        });
      return continents;
    },

    continent: async (_root, { name }): Promise<Continent | null> => {
      const continent = await ContinentModel.findOne({ name })
        .lean()
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
        });
      if (!continent) return null;
      return continent;
    },
  },
};

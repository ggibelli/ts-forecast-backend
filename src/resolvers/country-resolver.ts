import { QueryResolvers, Country } from '../generated/graphql';
import { Country as CountryModel } from '../models/country';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    countries: async (): Promise<Country[]> => {
      const countries = await CountryModel.find({})
        .lean()
        .populate({
          path: 'regions',
          select: ['name', 'latitude', 'longitude'],
          populate: {
            path: 'surfSpots',
            select: 'name',
            match: { isSecret: false },
          },
        });
      return countries;
    },

    country: async (_root, { name }): Promise<Country | null> => {
      const country = await CountryModel.findOne({ name })
        .lean()
        .populate({
          path: 'regions',
          select: ['name', 'latitude', 'longitude'],
          populate: {
            path: 'surfSpots',
            select: 'name',
            match: { isSecret: false },
          },
        });
      if (!country) return null;
      return country;
    },
  },
};

import { QueryResolvers, Country } from '../generated/graphql';
import { Country as CountryModel } from '../models/country';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    countries: async (): Promise<Country[]> => {
      const countries: Country[] = await CountryModel.find({})
        .populate({
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
      return countries;
    },
  },
};

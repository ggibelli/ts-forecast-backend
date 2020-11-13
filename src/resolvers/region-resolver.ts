import { QueryResolvers, Region } from '../generated/graphql';
import { Region as RegionModel } from '../models/region';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    regions: async (): Promise<Region[]> => {
      const regions = await RegionModel.find({})
        .lean()
        .populate({
          path: 'surfSpots',
          select: 'name',
          match: { isSecret: false },
        });
      return regions;
    },

    region: async (_root, { name }): Promise<Region | null> => {
      const region = await RegionModel.findOne({ name })
        .lean()
        .populate({
          path: 'surfSpots',
          select: 'name',
          match: { isSecret: false },
        });
      if (!region) return null;
      return region;
    },
  },
};

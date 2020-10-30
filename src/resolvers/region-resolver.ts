import { QueryResolvers, Region } from '../generated/graphql';
import { Region as RegionModel } from '../models/region';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    regions: async (): Promise<Region[]> => {
      const regions: Region[] = await RegionModel.find({})
        .populate({
          populate: {
            path: 'surfSpots',
            select: 'name',
            match: { isSecret: false },
          },
        })
        .lean();
      return regions;
    },
  },
};

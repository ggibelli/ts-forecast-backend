import { QueryResolvers, Surfspot } from '../generated/graphql';
import { SurfSpot as SurfspotModel } from '../models/surfspot';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    surfspots: async (_root, { country }): Promise<Surfspot[]> => {
      if (country) {
        return SurfspotModel.find({ country: { $in: [country] } });
      }
      const surfspots = await SurfspotModel.find({})
        .lean()
        .populate('continent', { name: 1 })
        .populate('country', { name: 1 })
        .populate('region', { name: 1 });
      return surfspots;
    },

    surfspot: async (_root, { name }): Promise<Surfspot | null> => {
      const region = await SurfspotModel.findOne({ name })
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

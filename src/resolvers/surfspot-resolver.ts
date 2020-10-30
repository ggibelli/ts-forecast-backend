import { QueryResolvers, Surfspot } from '../generated/graphql';
import { SurfSpot as SurfspotModel } from '../models/surfspot';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolver: Resolvers = {
  Query: {
    surfspots: async (): Promise<Surfspot[]> => {
      const surfspots: Surfspot[] = await SurfspotModel.find({})
        .select('name')
        .populate('continent', { name: 1 })
        .populate('country', { name: 1 })
        .populate('region', { name: 1 })
        .lean();
      return surfspots;
    },
  },
};

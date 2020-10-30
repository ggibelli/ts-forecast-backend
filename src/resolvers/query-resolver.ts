import {
  QueryResolvers,
  Continent,
  Country,
  Region,
  Surfspot,
  User,
} from '../generated/graphql';
import { Continent as ContinentModel } from '../models/continent';
import { Country as CountryModel } from '../models/country';
import { Region as RegionModel } from '../models/region';
import { SurfSpot as SurfspotModel } from '../models/surfspot';
//import { Forecast as ForecastModel } from '../models/forecast';
import { User as UserModel } from '../models/user';

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

    surfspots: async (): Promise<Surfspot[]> => {
      const surfspots: Surfspot[] = await SurfspotModel.find({})
        .select('name')
        .populate('continent', { name: 1 })
        .populate('country', { name: 1 })
        .populate('region', { name: 1 })
        .lean();
      return surfspots;
    },

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

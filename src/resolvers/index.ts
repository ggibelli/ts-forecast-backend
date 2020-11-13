import { merge } from 'lodash';
import { resolver as continentResolvers } from './continent-resolver';
import { resolver as countryResolvers } from './country-resolver';
import { resolver as regionResolvers } from './region-resolver';
import { resolver as surfspotResolvers } from './surfspot-resolver';
//import { resolver as forecastResolvers } from './forecast-resolver';
import { resolver as userResolvers } from './user-resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = merge(
  continentResolvers,
  countryResolvers,
  regionResolvers,
  surfspotResolvers,
  userResolvers
);

export default resolvers;

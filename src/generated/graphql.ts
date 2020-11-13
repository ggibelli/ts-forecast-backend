import { GraphQLResolveInfo } from 'graphql';
import { IUser } from './src/models/user.ts';
import { IContinent } from './src/models/continent.ts';
import { ICountry } from './src/models/country.ts';
import { IRegion } from './src/models/region.ts';
import { ISurfspot } from './src/models/surfspot.ts';
import { IForecast } from './src/models/forecast.ts';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Continent = {
  __typename?: 'Continent';
  _id: Scalars['ID'];
  name: Scalars['String'];
  countries?: Maybe<Array<Country>>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  _id: Scalars['ID'];
  name: Scalars['String'];
  continent: Continent;
  regions?: Maybe<Array<Region>>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type ForecastData = {
  __typename?: 'ForecastData';
  airTemperature?: Maybe<Scalars['Float']>;
  cloudCover?: Maybe<Scalars['Float']>;
  precipation?: Maybe<Scalars['Float']>;
  gust?: Maybe<Scalars['Float']>;
  secondarySwellDirection?: Maybe<Scalars['Float']>;
  secondarySwellHeight?: Maybe<Scalars['Float']>;
  secondarySwellPeriod?: Maybe<Scalars['Float']>;
  swellDirection?: Maybe<Scalars['Float']>;
  swellHeight?: Maybe<Scalars['Float']>;
  swellPeriod?: Maybe<Scalars['Float']>;
  waterTemperature?: Maybe<Scalars['Float']>;
  waveDirection?: Maybe<Scalars['Float']>;
  waveHeight?: Maybe<Scalars['Float']>;
  wavePeriod?: Maybe<Scalars['Float']>;
  windDirection?: Maybe<Scalars['Float']>;
  windSpeed?: Maybe<Scalars['Float']>;
  windWaveDirection?: Maybe<Scalars['Float']>;
  windWaveHeight?: Maybe<Scalars['Float']>;
  windWavePeriod?: Maybe<Scalars['Float']>;
};

export type IForecast = {
  time: Scalars['String'];
  data: ForecastData;
};

export type ITide = {
  time: Scalars['String'];
  type: Scalars['String'];
  height: Scalars['Float'];
};

export type Forecast = {
  __typename?: 'Forecast';
  _id: Scalars['ID'];
  surfspot: Surfspot;
  forecast?: Maybe<IForecast>;
  forecastLastRequest: Scalars['Int'];
  tides?: Maybe<ITide>;
  tidesLastRequest: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  continents: Array<Continent>;
  continent?: Maybe<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  regions: Array<Region>;
  region?: Maybe<Region>;
  forecasts: Array<Forecast>;
  forecast?: Maybe<Forecast>;
  surfspots?: Maybe<Array<Maybe<Surfspot>>>;
  surfspot?: Maybe<Surfspot>;
  users: Array<User>;
  user?: Maybe<User>;
};


export type QueryContinentArgs = {
  name: Scalars['String'];
};


export type QueryCountryArgs = {
  name: Scalars['String'];
};


export type QueryRegionArgs = {
  name: Scalars['String'];
};


export type QueryForecastArgs = {
  name: Scalars['String'];
};


export type QuerySurfspotsArgs = {
  country?: Maybe<Scalars['String']>;
};


export type QuerySurfspotArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  _id: Scalars['String'];
};

export type Region = {
  __typename?: 'Region';
  _id: Scalars['ID'];
  name: Scalars['String'];
  continent: Continent;
  country: Country;
  surfSpots?: Maybe<Array<Surfspot>>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type Surfspot = {
  __typename?: 'Surfspot';
  _id: Scalars['ID'];
  name: Scalars['String'];
  continent: Continent;
  country: Country;
  region: Region;
  forecast?: Maybe<Forecast>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  user?: Maybe<User>;
  type?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  bottom?: Maybe<Scalars['String']>;
  good_swell_direction?: Maybe<Scalars['String']>;
  good_wind_direction?: Maybe<Scalars['String']>;
  best_tide_position?: Maybe<Scalars['String']>;
  best_tide_movement?: Maybe<Scalars['String']>;
  dangers?: Maybe<Scalars['String']>;
  tile_url?: Maybe<Scalars['String']>;
  isSecret?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  passwordHash: Scalars['String'];
  createdSpots?: Maybe<Array<Surfspot>>;
  starredSpots?: Maybe<Array<Surfspot>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Continent: ResolverTypeWrapper<IContinent>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  Country: ResolverTypeWrapper<ICountry>;
  ForecastData: ResolverTypeWrapper<Partial<ForecastData>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>;
  IForecast: never;
  ITide: never;
  Forecast: ResolverTypeWrapper<IForecast>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  Query: ResolverTypeWrapper<{}>;
  Region: ResolverTypeWrapper<IRegion>;
  Surfspot: ResolverTypeWrapper<ISurfspot>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  User: ResolverTypeWrapper<IUser>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Continent: IContinent;
  ID: Partial<Scalars['ID']>;
  String: Partial<Scalars['String']>;
  Country: ICountry;
  ForecastData: Partial<ForecastData>;
  Float: Partial<Scalars['Float']>;
  IForecast: never;
  ITide: never;
  Forecast: IForecast;
  Int: Partial<Scalars['Int']>;
  Query: {};
  Region: IRegion;
  Surfspot: ISurfspot;
  Boolean: Partial<Scalars['Boolean']>;
  User: IUser;
}>;

export type ContinentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Continent'] = ResolversParentTypes['Continent']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<ResolversTypes['Country']>>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  continent?: Resolver<ResolversTypes['Continent'], ParentType, ContextType>;
  regions?: Resolver<Maybe<Array<ResolversTypes['Region']>>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastData'] = ResolversParentTypes['ForecastData']> = ResolversObject<{
  airTemperature?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cloudCover?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  precipation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  secondarySwellDirection?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  secondarySwellHeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  secondarySwellPeriod?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  swellDirection?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  swellHeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  swellPeriod?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  waterTemperature?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  waveDirection?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  waveHeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wavePeriod?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windDirection?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windWaveDirection?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windWaveHeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windWavePeriod?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IForecastResolvers<ContextType = any, ParentType extends ResolversParentTypes['IForecast'] = ResolversParentTypes['IForecast']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['ForecastData'], ParentType, ContextType>;
}>;

export type ITideResolvers<ContextType = any, ParentType extends ResolversParentTypes['ITide'] = ResolversParentTypes['ITide']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type ForecastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Forecast'] = ResolversParentTypes['Forecast']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  surfspot?: Resolver<ResolversTypes['Surfspot'], ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['IForecast']>, ParentType, ContextType>;
  forecastLastRequest?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tides?: Resolver<Maybe<ResolversTypes['ITide']>, ParentType, ContextType>;
  tidesLastRequest?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  continents?: Resolver<Array<ResolversTypes['Continent']>, ParentType, ContextType>;
  continent?: Resolver<Maybe<ResolversTypes['Continent']>, ParentType, ContextType, RequireFields<QueryContinentArgs, 'name'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryArgs, 'name'>>;
  regions?: Resolver<Array<ResolversTypes['Region']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<QueryRegionArgs, 'name'>>;
  forecasts?: Resolver<Array<ResolversTypes['Forecast']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType, RequireFields<QueryForecastArgs, 'name'>>;
  surfspots?: Resolver<Maybe<Array<Maybe<ResolversTypes['Surfspot']>>>, ParentType, ContextType, RequireFields<QuerySurfspotsArgs, never>>;
  surfspot?: Resolver<Maybe<ResolversTypes['Surfspot']>, ParentType, ContextType, RequireFields<QuerySurfspotArgs, 'name'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
}>;

export type RegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  continent?: Resolver<ResolversTypes['Continent'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  surfSpots?: Resolver<Maybe<Array<ResolversTypes['Surfspot']>>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfspotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Surfspot'] = ResolversParentTypes['Surfspot']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  continent?: Resolver<ResolversTypes['Continent'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bottom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  good_swell_direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  good_wind_direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  best_tide_position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  best_tide_movement?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dangers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tile_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isSecret?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdSpots?: Resolver<Maybe<Array<ResolversTypes['Surfspot']>>, ParentType, ContextType>;
  starredSpots?: Resolver<Maybe<Array<ResolversTypes['Surfspot']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Continent?: ContinentResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  ForecastData?: ForecastDataResolvers<ContextType>;
  IForecast?: IForecastResolvers<ContextType>;
  ITide?: ITideResolvers<ContextType>;
  Forecast?: ForecastResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  Surfspot?: SurfspotResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

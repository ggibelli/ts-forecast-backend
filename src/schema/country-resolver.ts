// import { ObjectId } from 'mongodb';
// import { Resolver, Query, Arg } from 'type-graphql';
// import { Country, CountryModel } from '../models/country';
// import { ObjectIdScalar } from '../utils/object-id.scalar';

// @Resolver((_of) => Country)
// export class CountryResolver {
//   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//   @Query((_returns) => Country)
//   async country(
//     @Arg('countryId', (_type) => ObjectIdScalar) countryId: ObjectId
//   ) {
//     return await CountryModel.findById(countryId);
//   }

//   @Query((_returns) => [Country])
//   async countries(): Promise<Country[]> {
//     return await CountryModel.find({});
//   }
// }

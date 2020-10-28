// import { ObjectId } from 'mongodb';
// import { Resolver, Query, Arg } from 'type-graphql';
// import { Region, RegionModel } from '../models/region';
// import { ObjectIdScalar } from '../utils/object-id.scalar';

// @Resolver((_of) => Region)
// export class RegionResolver {
//   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//   @Query((_returns) => Region)
//   async region(@Arg('regionId', (_type) => ObjectIdScalar) regionId: ObjectId) {
//     return await RegionModel.findById(regionId);
//   }

//   @Query((_returns) => [Region])
//   async regions(): Promise<Region[]> {
//     return await RegionModel.find({});
//   }
// }

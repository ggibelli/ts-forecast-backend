import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg } from 'type-graphql';
import { SurfSpot, SurfSpotModel } from '../entities/surfspot';
import { ObjectIdScalar } from '../utils/object-id.scalar';

@Resolver((_of) => SurfSpot)
export class SurfspotResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Query((_returns) => SurfSpot)
  async surfspot(
    @Arg('surfspotId', (_type) => ObjectIdScalar) surfspotId: ObjectId
  ) {
    return await SurfSpotModel.findById(surfspotId);
  }

  @Query((_returns) => Number)
  async spotsNumber(): Promise<number> {
    const surfspotNumber = await SurfSpotModel.countDocuments();
    return surfspotNumber;
  }

  @Query((_returns) => [SurfSpot])
  async surfspots(): Promise<SurfSpot[]> {
    return await SurfSpotModel.find({});
  }
}

import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg } from 'type-graphql';
import { Continent, ContinentModel } from '../entities/continent';
import { ObjectIdScalar } from '../utils/object-id.scalar';

@Resolver((_of) => Continent)
export class ContinentResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Query((_returns) => Continent)
  async continent(
    @Arg('continentId', (_type) => ObjectIdScalar) continentId: ObjectId
  ) {
    return await ContinentModel.findById(continentId);
  }

  @Query((_returns) => [Continent])
  async continents(): Promise<Continent[]> {
    return await ContinentModel.find({});
  }
}

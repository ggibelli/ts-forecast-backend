import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Continent, ContinentModel } from '../entities/continent';
import { Country, CountryModel } from '../entities/country';
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
  @FieldResolver()
  async countries(@Root() continent: Continent): Promise<Array<Country>> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await CountryModel.find({ continent: continent._id }))!;
  }
}

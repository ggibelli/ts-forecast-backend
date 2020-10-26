import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg } from 'type-graphql';
import { Forecast, ForecastModel } from '../entities/forecast';
import { ObjectIdScalar } from '../utils/object-id.scalar';

@Resolver((_of) => Forecast)
export class ForecastResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Query((_returns) => Forecast)
  async forecast(
    @Arg('forecastId', (_type) => ObjectIdScalar) forecastId: ObjectId
  ) {
    return await ForecastModel.findById(forecastId);
  }

  @Query((_returns) => [Forecast])
  async forecasts(): Promise<Forecast[]> {
    return await ForecastModel.find({});
  }
}

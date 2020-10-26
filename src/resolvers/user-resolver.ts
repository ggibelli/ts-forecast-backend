import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg } from 'type-graphql';
import { User, UserModel } from '../entities/user';
import { ObjectIdScalar } from '../utils/object-id.scalar';

@Resolver((_of) => User)
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Query((_returns) => User)
  async user(@Arg('userId', (_type) => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query((_returns) => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }
}

import { User } from '../entities';
import { AddProviderRequestModel } from '../models';

export interface IAuthRepository {
  login(AddProviderRequestModel: AddProviderRequestModel): Promise<User>;
}

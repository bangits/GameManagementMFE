import { injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { UserEntity } from '../entities';
import { AddProviderRequestModel } from '../models';

@injectable()
export class AuthRepository implements IAuthRepository {
  login = async (AddProviderRequestModel: AddProviderRequestModel) => {
    console.log(AddProviderRequestModel);

    return new UserEntity({
      id: '1',
      name: AddProviderRequestModel.logo
    }).user;
  };
}

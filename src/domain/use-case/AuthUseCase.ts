import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { AddProviderRequestModel } from '../models';
import { User } from './../entities';

@injectable()
export class AuthUseCase {
  @inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  login = async (AddProviderRequestModel: AddProviderRequestModel): Promise<User> => {
    console.log(this);
    return this.authRepository.login(AddProviderRequestModel);
  };
}

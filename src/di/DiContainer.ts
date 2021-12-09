import { GameRepository, ProviderRepository } from '@/data';
import { GameUseCase, ProviderUseCase } from '@/domain/use-case';
import { CacheService, HttpService } from '@atom/common';
import { Container } from 'inversify';
import { DI_CONSTANTS } from './constants';

export class DiContainer {
  public diContainer: Container;

  public configure = () => {
    this.diContainer = new Container({
      defaultScope: 'Singleton'
    });

    // Services
    this.diContainer.bind(DI_CONSTANTS.CacheService).to(CacheService);
    this.diContainer.bind(DI_CONSTANTS.HttpService).toDynamicValue(
      () =>
        new HttpService({
          baseURL: 'http://20.120.67.13/api/v1'
        })
    );

    // Repositories
    this.diContainer.bind(DI_CONSTANTS.PROVIDER.ProviderRepository).to(ProviderRepository);
    this.diContainer.bind(DI_CONSTANTS.GAME.GameRepository).to(GameRepository);

    // Use cases
    this.diContainer.bind(DI_CONSTANTS.PROVIDER.ProviderUseCase).to(ProviderUseCase);
    this.diContainer.bind(DI_CONSTANTS.GAME.GameUseCase).to(GameUseCase);
  };
}

export const containerInstance = new DiContainer();

import { ProviderRepository } from '@/data';
import { ProviderUseCase } from '@/domain/use-case';
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
          baseURL: 'http://52.170.166.223/api/v1'
        })
    );

    // Repositories
    this.diContainer.bind(DI_CONSTANTS.ProviderRepository).to(ProviderRepository);

    // Use cases
    this.diContainer.bind(DI_CONSTANTS.ProviderUseCase).to(ProviderUseCase);
  };
}

export const containerInstance = new DiContainer();

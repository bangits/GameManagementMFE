import { GameRepository, ProviderRepository } from '@/data';
import { GameUseCase, ProviderUseCase } from '@/domain/use-case';
import { CacheService, enviromentService, HttpService } from '@atom/common';
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
          baseURL: enviromentService.get<{ gameManager: string }>('apiUrlPaths').gameManager
        })
    );
    this.diContainer.bind(DI_CONSTANTS.GameLauncherHttpService).toDynamicValue(
      () =>
        new HttpService({
          baseURL: enviromentService.get<{ gameLaunchManger: string }>('apiUrlPaths').gameLaunchManger
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

import { cachedFn, ICacheService, IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IProviderRepository } from '../boundaries/IProviderRepository';
import { GetProviderRequestModel, GetProviderResponseModel, AddProviderRequestModel } from '../models';

@injectable()
export class ProviderRepository implements IProviderRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  @inject('ICacheService')
  private readonly cacheService: ICacheService;

  getProviders = cachedFn(
    'GetProviderResponse',
    async (getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
      // const providers = await this.httpService.post<GetProviderResponseModel, {}, {}>({
      //   url: '/Providers',
      //   body: getProviderRequestModel
      // });

      // return providers;
      return {
        results: [
          {
            id: 8,
            name: 'Test',
            logo: 'string',
            gameCount: 10,
            lastUpdatedDate: '2021-11-01T13:07:16.2093269',
            creationDate: '2021-11-01T13:07:16.2093262',
            defaultCurrency: null,
            status: {
              id: 2,
              name: 'Inactive'
            }
          },
          {
            id: 7,
            name: '999',
            logo: 'string',
            gameCount: 14,
            lastUpdatedDate: '2021-10-08T14:05:49.0204521',
            creationDate: '2021-10-08T14:05:49.0204519',
            defaultCurrency: null,
            status: {
              id: 2,
              name: 'Inactive'
            }
          },
          {
            id: 6,
            name: '888',
            logo: 'string',
            gameCount: 0,
            lastUpdatedDate: '2021-10-08T14:05:18.1647391',
            creationDate: '2021-10-08T14:05:18.1647388',
            defaultCurrency: null,
            status: {
              id: 2,
              name: 'Inactive'
            }
          },
          {
            id: 5,
            name: 'string',
            logo: 'string',
            gameCount: 1,
            lastUpdatedDate: '2021-10-08T12:00:24.8067919',
            creationDate: '2021-10-08T12:00:24.8067906',
            defaultCurrency: null,
            status: {
              id: 2,
              name: 'Inactive'
            }
          }
        ],
        currentPage: 1,
        pageCount: 1,
        pageSize: 30,
        rowCount: 4
      };
    }
  ).bind(this);

  addProviders = cachedFn('addProvider', async (addProviderRequestModel: AddProviderRequestModel) => {
    const addProvider = await this.httpService.post<void, {}, AddProviderRequestModel>({
      url: '/Providers',
      body: addProviderRequestModel
    });

    return addProvider;
  }).bind(this);
}

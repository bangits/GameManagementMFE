import { cachedFn, ICacheService, IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import { IProviderRepository } from '../boundaries/IProviderRepository';
import { GetProviderNamesResponseModel, GetProviderRequestModel, GetProviderResponseModel } from '../models';

@injectable()
export class ProviderRepository implements IProviderRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  @inject('ICacheService')
  private readonly cacheService: ICacheService;

  getProviders = cachedFn(
    'GetProviderResponse',
    async (getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
      const providers = await this.httpService.post<GetProviderResponseModel, {}, {}>({
        url: '/Providers',
        body: getProviderRequestModel
      });

      return providers;
      return {
        results: [
          {
            //@ts-ignore
            id: +getProviderRequestModel.providerId === 5 ? 444444 : 1000000,
            name: 'Test',
            logo: 'string',
            gameCount: 10,
            lastUpdatedDate: '2021-11-01T13:07:16.2093269',
            creationDate: '2021-11-01T13:07:16.2093262',
            defaultCurrency: {
              id: 4,
              name: 'United State Dollar',
              code: 'USD'
            },
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
            defaultCurrency: {
              id: 10,
              name: 'Aruban florin',
              code: 'AWG'
            },
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
            defaultCurrency: {
              id: 9,
              name: 'Armenian dram',
              code: 'AMD'
            },
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
            defaultCurrency: {
              id: 3,
              name: 'Algerian dinar',
              code: 'DZD'
            },
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
  getProviderNames = cachedFn('GetProviderNamesResponse', async (): Promise<GetProviderNamesResponseModel> => {
    const providerNames = await this.httpService.get<GetProviderNamesResponseModel, {}>({
      url: '/Providers/ProvidersName'
    });

    return providerNames;
  }).bind(this);
}

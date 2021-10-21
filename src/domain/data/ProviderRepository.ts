import { injectable } from 'inversify';
import { IProviderRepository } from '../boundaries/IProviderRepository';
import { GetProviderRequestModel, GetProviderResponseModel } from '../models';

@injectable()
export class ProviderRepository implements IProviderRepository {
  getProviders = async (getProviderRequestModel: GetProviderRequestModel): Promise<GetProviderResponseModel> => {
    const mocProviders = {
      results: [
        {
          id: 1,
          name: 'string',
          logo: 'string',
          gameCount: 0,
          lastUpdatedDate: '2021-10-21T13:50:11.130Z',
          creationDate: '2021-10-21T13:50:11.130Z',
          defaultCurrency: {
            id: 1,
            name: 'string',
            code: 'string'
          },
          status: {
            id: 1,
            name: 'string'
          }
        },
        {
          id: 1,
          name: 'string',
          logo: 'string',
          gameCount: 0,
          lastUpdatedDate: '2021-10-21T13:50:11.130Z',
          creationDate: '2021-10-21T13:50:11.130Z',
          defaultCurrency: {
            id: 1,
            name: 'string',
            code: 'string'
          },
          status: {
            id: 1,
            name: 'string'
          }
        }
      ],
      currentPage: 1,
      pageCount: 10,
      pageSize: 10,
      rowCount: 100
    };

    return mocProviders;
  };
}

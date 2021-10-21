import { Provider } from '../../entities/ProviderEntity';
import { PagedResult } from '../models/PageResult';

export interface GetProviderResponseModel extends PagedResult<Provider> {}

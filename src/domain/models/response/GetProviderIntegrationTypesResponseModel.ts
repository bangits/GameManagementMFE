import { PagedResult, PrimaryKey } from '@atom/common';

export class GetProviderIntegrationTypesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGameTypesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGameVolatilitiesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

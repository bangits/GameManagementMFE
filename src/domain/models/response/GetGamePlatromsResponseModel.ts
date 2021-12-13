import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGamePlatformsResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

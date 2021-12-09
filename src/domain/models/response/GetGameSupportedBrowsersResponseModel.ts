import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGameSupportedBrowsersResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

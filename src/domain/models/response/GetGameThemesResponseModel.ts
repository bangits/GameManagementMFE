import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGameThemesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

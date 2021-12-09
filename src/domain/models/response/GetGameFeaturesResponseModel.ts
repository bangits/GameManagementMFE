import { PagedResult, PrimaryKey } from '@atom/common';

export class GetGameFeaturesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

import { PagedResult, PrimaryKey } from '@atom/common';

export class GetClassNamesResponseModel extends PagedResult<{ id: PrimaryKey; name: string }> {}

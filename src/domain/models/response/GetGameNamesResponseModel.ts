import { PrimaryKey } from '@atom/common';

export type GetGameNamesResponseModel = {
  id: PrimaryKey;
  name: string;
}[];

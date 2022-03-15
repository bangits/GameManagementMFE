import { PrimaryKey } from '@atom/common';

export type GetGameFeaturesViewModel = {
  value: PrimaryKey;
  label: string;
  gameIds: PrimaryKey[];
}[];

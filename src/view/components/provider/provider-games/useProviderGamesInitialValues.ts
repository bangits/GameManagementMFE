import { useMemo } from 'react';
import { ProviderGamesFilterViewModel } from '@/view/models';
import { PrimaryKey } from '@atom/common';

export const useProviderGamesInitialValues = (providerId: PrimaryKey) => {
  const initialFilters = useMemo<ProviderGamesFilterViewModel>(
    () => ({
      gameSearch: '',
      gameTypeId: null,
      pagination: {
        page: 1,
        pageSize: 32
      },
      providerId
    }),
    [providerId]
  );

  return { initialFilters, providerId };
};

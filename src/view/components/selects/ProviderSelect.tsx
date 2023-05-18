import { GameManagementContext, GetProviderNamesViewModel } from '@/atom-game-management';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const ProviderSelect = ({ isMain, ...props }: Omit<CustomSelectProps & { isMain?: boolean }, 'options'>) => {
  const t = useTranslation();
  const { providerUseCase } = useContext(GameManagementContext);

  const [providerNames, setProviderNames] = useState<GetProviderNamesViewModel>([]);

  const selectOptions = useMemo(() => providerNames.map((c) => ({ value: c.value, label: c.label })), [providerNames]);

  useEffect(() => {
    providerUseCase.getProviderNames(isMain).then(setProviderNames);
  }, []);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('providerName')} />
    </>
  );
};

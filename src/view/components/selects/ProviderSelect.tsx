import { GameManagementContext, GetProviderNamesViewModel } from '@/atom-game-management';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export interface ProviderSelectProps extends Omit<CustomSelectProps, 'options'> {
  isMain?: boolean;
  valueProp?: 'label' | 'value';
}

export const ProviderSelect = ({ isMain = true, valueProp = 'value', ...props }: ProviderSelectProps) => {
  const t = useTranslation();
  const { providerUseCase } = useContext(GameManagementContext);

  const [providerNames, setProviderNames] = useState<GetProviderNamesViewModel>([]);

  const selectOptions = useMemo(
    () => providerNames.map((c) => ({ value: c[valueProp], label: c.label })),
    [valueProp, providerNames]
  );

  useEffect(() => {
    providerUseCase.getProviderNames(isMain).then(setProviderNames);
  }, []);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('providerName')} />
    </>
  );
};

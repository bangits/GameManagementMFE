import { GameManagementContext } from '@/adapter/react-context';
import { ProviderNames } from '@/domain/entities';
import { CustomSelect, CustomSelectProps } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const ProviderSelect = (props: Omit<CustomSelectProps, 'options'>) => {
  const { providerUseCase } = useContext(GameManagementContext);

  const [providers, setProviders] = useState<ProviderNames[]>([]);

  const selectOptions = useMemo(() => providers.map((c) => ({ value: c.id, label: c.name })), [providers]);

  useEffect(() => {
    providerUseCase.getProviderNames().then((getProvidersResponse) => setProviders(getProvidersResponse));
  }, []);

  return (
    <>
      <CustomSelect {...props} options={selectOptions} />
    </>
  );
};

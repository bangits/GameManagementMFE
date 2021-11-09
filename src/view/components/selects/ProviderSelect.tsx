import { containerInstance } from '@/di';
import { ProviderNames } from '@/domain/entities';
import { ProviderUseCase } from '@/domain/use-case';
import { CustomSelect, CustomSelectProps } from '@atom/common';
import { useEffect, useMemo, useState } from 'react';

export const ProvidersSelect = (props: Omit<CustomSelectProps, 'options'>) => {
  const providerUseCase = containerInstance.diContainer.get<ProviderUseCase>('ProviderUseCase');

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

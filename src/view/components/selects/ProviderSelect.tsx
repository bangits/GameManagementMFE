import { GameManagementContext } from '@/adapter/react-context';
import { GetProviderNamesViewModel } from '@/view/models';
import { CustomSelect, CustomSelectProps } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const ProviderSelect = (props: Omit<CustomSelectProps, 'options'>) => {
  const { providerRepository } = useContext(GameManagementContext);

  const [providers, setProviders] = useState<GetProviderNamesViewModel>([]);

  const selectOptions = useMemo(() => providers.map((c) => ({ value: c.id, label: c.name })), [providers]);

  useEffect(() => {
    providerRepository.getProviderNames().then((getProvidersResponse) => setProviders(getProvidersResponse));
  }, []);

  return (
    <>
      <CustomSelect {...props} options={selectOptions} />
    </>
  );
};

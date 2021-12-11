import { providerApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const ProviderSelect = (props: Omit<CustomSelectProps, 'options'>) => {
  const t = useTranslation();

  const { data: providerNames } = providerApi.useGetProviderNamesQuery({});

  return (
    <>
      <CustomSelect {...props} fullWidth options={providerNames || []} inputLabel={t.get('providerName')} />
    </>
  );
};

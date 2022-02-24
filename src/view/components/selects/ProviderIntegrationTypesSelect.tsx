import { providerApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const ProviderIntegrationTypesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: integrationTypes } = providerApi.useGetProviderIntegrationTypesQuery({});

  console.log(integrationTypes);

  return (
    <>
      <CustomSelect {...props} fullWidth options={integrationTypes || []} inputLabel={t.get('integrationTypeName')} />
    </>
  );
};

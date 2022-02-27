import { providerApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useMemo } from 'react';

export const ProviderIntegrationTypesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: integrationTypes } = providerApi.useGetProviderIntegrationTypesQuery({});

  const options = useMemo(
    () =>
      integrationTypes
        ? [
            ...(props.selectAll && !props.isMulti
              ? [
                  {
                    label: t.get('all'),
                    value: null
                  }
                ]
              : []),
            ...integrationTypes
          ]
        : [],
    [integrationTypes]
  );

  return (
    <>
      <CustomSelect {...props} fullWidth options={options} inputLabel={t.get('integrationType')} />
    </>
  );
};

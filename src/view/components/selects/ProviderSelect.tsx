import { providerApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const ProviderSelect = (props: Omit<CustomSelectProps & { isMain?: true }, 'options'>) => {
  const t = useTranslation();

  const { data: providerNames } = providerApi.useGetProviderNamesQuery(props.isMain);

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={providerNames || []}
        inputLabel={t.get('games.add.fields.providerName')}
      />
    </>
  );
};

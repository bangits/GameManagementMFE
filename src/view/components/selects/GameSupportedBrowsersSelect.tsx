import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameSupportedBrowsersSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameSupportedBrowsers } = gameApi.useGetGameThemesQuery({});

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={gameSupportedBrowsers || []}
        inputLabel={t.get('supportedBrowsers')}
      />
    </>
  );
};

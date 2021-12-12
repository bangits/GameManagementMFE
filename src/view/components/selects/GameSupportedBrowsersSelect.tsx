import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameSupportedBrowsersSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameSupportedBrowsers } = gameApi.useGetGameSupportedBrowsersQuery({});

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={gameSupportedBrowsers || []}
        inputLabel={t.get('games.list.fields.supportedBrowsers')}
      />
    </>
  );
};

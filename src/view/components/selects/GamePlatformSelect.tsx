import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GamePlatformSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gamePlatform } = gameApi.useGetGamePlatformsQuery({});

  return (
    <>
      <CustomSelect {...props} fullWidth options={gamePlatform || []} inputLabel={t.get('gamePlatforms')} />
    </>
  );
};

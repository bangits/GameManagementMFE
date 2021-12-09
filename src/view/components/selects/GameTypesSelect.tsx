import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameTypesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameTypes } = gameApi.useGetGameTypesQuery({});

  return (
    <>
      <CustomSelect {...props} fullWidth options={gameTypes || []} inputLabel={t.get('games.list.fields.gameTypes')} />
    </>
  );
};

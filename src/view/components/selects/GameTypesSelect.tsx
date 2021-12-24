import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, PrimaryKey, useTranslation } from '@atom/common';

export const GameTypesSelect = (props: CustomSelectProps & { gameTypeId?: PrimaryKey }) => {
  const t = useTranslation();

  const { data: gameTypes } = gameApi.useGetGameTypesQuery(props.gameTypeId);

  if (!gameTypes) return null;
  return (
    <>
      <CustomSelect {...props} fullWidth options={gameTypes || []} />
    </>
  );
};

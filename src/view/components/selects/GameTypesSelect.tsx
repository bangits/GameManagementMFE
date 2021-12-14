import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, PrimaryKey, useTranslation } from '@atom/common';

export const GameTypesSelect = (props: CustomSelectProps & { gameTypeId?: PrimaryKey; showAll?: boolean }) => {
  const t = useTranslation();

  const { data: gameTypes } = gameApi.useGetGameTypesQuery(props.gameTypeId);

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={gameTypes ? [...(props.showAll ? [{ label: t.get('all'), value: null }] : []), ...gameTypes] : []}
      />
    </>
  );
};

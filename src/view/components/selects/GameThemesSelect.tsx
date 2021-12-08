import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameThemesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameThemes } = gameApi.useGetGameThemesQuery({});

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={gameThemes || []}
        inputLabel={t.get('games.list.fields.gameThemes')}
      />
    </>
  );
};

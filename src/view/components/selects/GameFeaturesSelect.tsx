import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameFeaturesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameFeatures } = gameApi.useGetGameFeaturesQuery({});

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={gameFeatures || []}
        inputLabel={t.get('games.list.fields.gameFeatures')}
      />
    </>
  );
};

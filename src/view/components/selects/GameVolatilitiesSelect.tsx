import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameVolatilitiesSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: gameVolatilities } = gameApi.useGetGameThemesQuery({});

  return (
    <>
      <CustomSelect {...props} fullWidth options={gameVolatilities || []} inputLabel={t.get('volatility')} />
    </>
  );
};

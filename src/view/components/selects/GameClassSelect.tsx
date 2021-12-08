import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';

export const GameClassSelect = (props: CustomSelectProps) => {
  const t = useTranslation();

  const { data: classNames } = gameApi.useGetClassNamesQuery({});

  return (
    <>
      <CustomSelect {...props} fullWidth options={classNames || []} inputLabel={t.get('games.list.fields.class')} />
    </>
  );
};

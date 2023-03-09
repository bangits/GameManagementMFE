import { GameStatusesEnum } from '@/atom-game-management';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useMemo } from 'react';

export const GameStatusesSelect = (props: Omit<CustomSelectProps, 'options'>) => {
  const t = useTranslation();

  const selectOptions = useMemo(
    () => [
      {
        label: t.get('active'),
        value: GameStatusesEnum.ACTIVE
      },
      {
        label: t.get('inActive'),
        value: GameStatusesEnum.INACTIVE
      }
    ],
    [t]
  );

  return (
    <>
      <CustomSelect inputLabel={t.get('status')} {...props} fullWidth options={selectOptions || []} />
    </>
  );
};

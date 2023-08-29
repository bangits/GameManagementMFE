import { GameManagementContext } from '@/atom-game-management';
import { GetGameNamesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export interface GameNamesSelectProps extends Omit<CustomSelectProps, 'options'> {
  isMain?: boolean;
  valueProp?: 'label' | 'value';
}

export const GameNamesSelect = ({ valueProp = 'value', ...props }: GameNamesSelectProps) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameNames, setGameNames] = useState<GetGameNamesViewModel>([]);

  const selectOptions = useMemo(
    () => gameNames.map((c) => ({ value: c[valueProp], label: c.label })),
    [valueProp, gameNames]
  );

  useEffect(() => {
    gameUseCase.getGameNames(props.isMain).then(setGameNames);
  }, []);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('gameName')} />
    </>
  );
};

import { GameManagementContext } from '@/atom-game-management';
import { GetGameNamesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const GameNamesSelect = (props: Omit<CustomSelectProps & { isMain?: boolean }, 'options'>) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameNames, setGameNames] = useState<GetGameNamesViewModel>([]);

  const selectOptions = useMemo(() => gameNames.map((c) => ({ value: c.value, label: c.label })), [gameNames]);

  useEffect(() => {
    gameUseCase.getGameNames(props.isMain).then(setGameNames);
  }, []);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('gameName')} />
    </>
  );
};

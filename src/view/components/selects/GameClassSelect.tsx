import { gameApi } from '@/adapter/redux/api';
import { GameManagementContext } from '@/atom-game-management';
import { GetClassNamesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const GameClassSelect = (props: CustomSelectProps) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameClasses, setGameClasses] = useState<GetClassNamesViewModel>([]);

  const selectOptions = useMemo(() => gameClasses.map((c) => ({ value: c.value, label: c.label })), [gameClasses]);

  useEffect(() => {
    gameUseCase.getClassNames().then(setGameClasses);
  }, []);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('class')} />
    </>
  );
};

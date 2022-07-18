import { GameManagementContext } from '@/atom-game-management';
import { GetGameNamesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, PrimaryKey } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const GameTypesSelect = (props: CustomSelectProps & { gameTypeId?: PrimaryKey }) => {
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameTypes, setGameTypes] = useState<GetGameNamesViewModel>([]);

  const selectOptions = useMemo(() => gameTypes.map((c) => ({ value: c.value, label: c.label })), [gameTypes]);

  useEffect(() => {
    gameUseCase.getGameTypes(props.gameTypeId).then(setGameTypes);
  }, [props.gameTypeId]);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} />
    </>
  );
};

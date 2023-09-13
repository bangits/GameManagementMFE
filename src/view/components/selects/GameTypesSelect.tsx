import { GameManagementContext } from '@/atom-game-management';
import { GetGameNamesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, PrimaryKey } from '@atom/common';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const GameTypesSelect = (
  props: CustomSelectProps & { gameTypeIds?: PrimaryKey[]; showEmptyOptions?: boolean }
) => {
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameTypes, setGameTypes] = useState<GetGameNamesViewModel>([]);

  const selectOptions = useMemo(() => gameTypes.map((c) => ({ value: c.value, label: c.label })), [gameTypes]);

  const fetchOptions = useCallback(() => {
    if (!props.isDisabled) {
      gameUseCase.getGameTypes(props.gameTypeIds?.filter((type) => !!type)).then(setGameTypes);
    }
  }, [props.showEmptyOptions, props.gameTypeIds]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return (
    <>
      <CustomSelect {...props} fullWidth options={props.showEmptyOptions ? [] : selectOptions || []} />
    </>
  );
};

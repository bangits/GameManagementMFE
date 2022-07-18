import { GameManagementContext } from '@/atom-game-management';
import { GetGameFeaturesViewModel } from '@/view/models/view-models';
import { CustomSelect, CustomSelectProps, PrimaryKey, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export interface GameFeaturesSelectProps extends Omit<CustomSelectProps, 'onChange'> {
  onChange?(updatedOptions: PrimaryKey | PrimaryKey[], gameIds: PrimaryKey[]): void;
}

export const GameFeaturesSelect = (props: GameFeaturesSelectProps) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameFeatures, setGameFeatures] = useState<GetGameFeaturesViewModel>([]);

  const selectOptions = useMemo(() => gameFeatures.map((c) => ({ value: c.value, label: c.label })), [gameFeatures]);

  useEffect(() => {
    gameUseCase.getGameFeatures().then(setGameFeatures);
  }, []);

  return (
    <>
      <CustomSelect
        {...props}
        fullWidth
        options={selectOptions || []}
        inputLabel={t.get('feature')}
        onChange={(updatedOptions) => {
          const updatedOptionsArray = Array.isArray(updatedOptions) ? updatedOptions : [updatedOptions];

          const gameFeaturesGameIds: PrimaryKey[] = updatedOptionsArray.reduce(
            (acc, value) => [...acc, ...(gameFeatures.find((feature) => feature.value === value)?.gameIds || [])],
            []
          );

          props.onChange?.(updatedOptions, gameFeaturesGameIds);
        }}
      />
    </>
  );
};

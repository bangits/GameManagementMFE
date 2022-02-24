import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { GameManagementContext } from '@/atom-game-management';
import { GetGameFeaturesViewModel } from '@/view/models/view-models';
import { useContext, useEffect, useMemo, useState } from 'react';


export const GameFeaturesSelect = (props: CustomSelectProps) => {

  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [gameFeatures, setGameFeatures] = useState<GetGameFeaturesViewModel>([]);

  const selectOptions = useMemo(() => gameFeatures.map((c) => ({ value: c.value, label: c.label })), [gameFeatures]);

  useEffect(() => {
    gameUseCase.getGameFeatures().then(setGameFeatures);
  }, []);


  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('feature')} />
    </>
  );
};

import { GameManagementContext, GetGamePlatformsViewModel } from '@/atom-game-management';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const GamePlatformSelect = (props: CustomSelectProps & { valueKey?: 'value' | 'label' }) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [providerNames, setProviderNames] = useState<GetGamePlatformsViewModel>([]);

  const selectOptions = useMemo(
    () => providerNames.map((c) => ({ value: c[props.valueKey || 'value'], label: c.label })),
    [providerNames]
  );

  useEffect(() => {
    gameUseCase.getGamePlatforms().then(setProviderNames);
  }, []);
  return (
    <>
      <CustomSelect inputLabel={t.get('gamePlatforms')} {...props} fullWidth options={selectOptions || []} />
    </>
  );
};

import { GameManagementContext, GetGameBrowsersViewModes } from '@/atom-game-management';
import { CustomSelect, CustomSelectProps, useTranslation } from '@atom/common';
import { useContext, useEffect, useMemo, useState } from 'react';

export const GameSupportedBrowsersSelect = (props: CustomSelectProps) => {
  const t = useTranslation();
  const { gameUseCase } = useContext(GameManagementContext);

  const [providerNames, setProviderNames] = useState<GetGameBrowsersViewModes>([]);

  const selectOptions = useMemo(() => providerNames.map((c) => ({ value: c.value, label: c.label })), [providerNames]);

  useEffect(() => {
    gameUseCase.getGameSupportedBrowsers().then(setProviderNames);
  }, []);
  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions || []} inputLabel={t.get('supportedBrowsers')} />
    </>
  );
};

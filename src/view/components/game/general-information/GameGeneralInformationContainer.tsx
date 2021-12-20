import { gameApi } from '@/adapter/redux/api';
import { GamesDetailsViewModel } from '@/view/models';
import { useTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import React, { FC, useCallback } from 'react';
import GameGeneralInformation from './GameGeneralInformation';

export interface GameGeneralInformationContainer {
  data: GamesDetailsViewModel;
}

const GameGeneralInformationContainer: FC<GameGeneralInformationContainer> = ({ data }) => {
  const t = useTranslation();

  const [editGameInfo] = gameApi.useEditGameInformationMutation();

  const showSuccessAlert = useCallback(() => alert.success({ alertLabel: t.get('successAlertMessage') }), [t]);

  const showErrorAlert = useCallback(() => alert.error({ alertLabel: t.get('errorAlertMessage') }), [t]);

  const onGameInfoSubmit = useCallback((data) => {
    editGameInfo(data).unwrap().then(showSuccessAlert).catch(showErrorAlert);
  }, []);

  return <GameGeneralInformation data={data} onGameInfoSubmit={onGameInfoSubmit} />;
};

export default GameGeneralInformationContainer;

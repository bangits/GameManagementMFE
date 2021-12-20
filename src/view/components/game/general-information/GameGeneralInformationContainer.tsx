import { gameApi } from '@/adapter/redux/api';
import { GamesDetailsViewModel } from '@/view/models';
import { useTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import GameGeneralInformation from './GameGeneralInformation';

export interface GameGeneralInformationContainer {
  data: GamesDetailsViewModel;
}

const GameGeneralInformationContainer: FC<GameGeneralInformationContainer> = ({ data }) => {
  const t = useTranslation();

  const location = useLocation();

  const isEdit = location.search.includes('isEdit');

  const [editGameInfo] = gameApi.useEditGameInformationMutation();
  const [editGameProperties] = gameApi.useEditGamePropertiesMutation();

  const showSuccessAlert = useCallback(() => alert.success({ alertLabel: t.get('successAlertMessage') }), [t]);

  const showErrorAlert = useCallback(() => alert.error({ alertLabel: t.get('errorAlertMessage') }), [t]);

  const onGameInfoSubmit = useCallback((data) => {
    editGameInfo(data).unwrap().then(showSuccessAlert).catch(showErrorAlert);
  }, []);

  const onGamePropertiesSubmit = useCallback((data) => {
    editGameProperties(data).unwrap().then(showSuccessAlert).catch(showErrorAlert);
  }, []);

  return (
    <GameGeneralInformation
      data={data}
      onGameInfoSubmit={onGameInfoSubmit}
      onGamePropertiesSubmit={onGamePropertiesSubmit}
      isEdit={isEdit}
    />
  );
};

export default GameGeneralInformationContainer;

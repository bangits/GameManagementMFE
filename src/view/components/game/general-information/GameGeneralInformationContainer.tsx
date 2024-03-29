import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { gameApi } from '@/adapter/redux/api';
import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';
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
  const [editGameCompatibility] = gameApi.useEditGameCompatibilityMutation();

  const showSuccessAlert = useCallback(() => alert.success({ alertLabel: t.get('successAlertMessage') }), [t]);

  const showErrorAlert = useCallback(() => alert.error({ alertLabel: t.get('errorAlertMessage') }), [t]);

  const onGameInfoSubmit = useCallback(
    ({ subTypeId, gameTypeId, categoryId, ...data }: EditGameInformationViewModel) => {
      editGameInfo({ ...data, subTypeId: subTypeId || gameTypeId || categoryId })
        .unwrap()
        .then(showSuccessAlert)
        .catch(showErrorAlert);
    },
    []
  );

  const onGamePropertiesSubmit = useCallback((data) => {
    editGameProperties(data).unwrap().then(showSuccessAlert).catch(showErrorAlert);
  }, []);

  const onGameCompatibilitySubmit = useCallback((data) => {
    editGameCompatibility(data).unwrap().then(showSuccessAlert).catch(showErrorAlert);
  }, []);

  return (
    <GameGeneralInformation
      data={data}
      onGameInfoSubmit={onGameInfoSubmit}
      onGamePropertiesSubmit={onGamePropertiesSubmit}
      onGameCompatibilitySubmit={onGameCompatibilitySubmit}
      isEdit={isEdit}
    />
  );
};

export default GameGeneralInformationContainer;

import { EditGameInformationViewModel, EditGamePropertiesViewModel, GamesDetailsViewModel } from '@/view/models';
import React, { FC } from 'react';
import Compatibility from './Compatibility';
import GameInformation from './GameInformation';
import GameProperties from './GameProperties';

export interface GameGeneralInformationProps {
  data: GamesDetailsViewModel;
  onGameInfoSubmit: (data: EditGameInformationViewModel) => void;
  onGamePropertiesSubmit: (data: EditGamePropertiesViewModel) => void;
  isEdit: boolean;
}

const GameGeneralInformation: FC<GameGeneralInformationProps> = ({
  data,
  onGameInfoSubmit,
  onGamePropertiesSubmit,
  isEdit
}) => {
  return (
    <>
      <GameInformation data={data} onSubmit={onGameInfoSubmit} isEdit={isEdit} />
      <GameProperties data={data} onSubmit={onGamePropertiesSubmit} isEdit={isEdit} />
      <Compatibility data={data} isEdit={isEdit} />
    </>
  );
};

export default GameGeneralInformation;

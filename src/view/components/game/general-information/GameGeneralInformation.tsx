import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';
import React, { FC } from 'react';
import Compatibility from './Compatibility';
import GameInformation from './GameInformation';
import GameProperties from './GameProperties';

export interface GameGeneralInformationProps {
  data: GamesDetailsViewModel;
  onGameInfoSubmit: (data: EditGameInformationViewModel) => void;
}

const GameGeneralInformation: FC<GameGeneralInformationProps> = ({ data, onGameInfoSubmit }) => {
  return (
    <>
      <GameInformation data={data} onSubmit={onGameInfoSubmit} />
      <GameProperties data={data} />
      <Compatibility data={data} />
    </>
  );
};

export default GameGeneralInformation;

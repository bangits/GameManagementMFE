import React from 'react';
import Compatibility from './Compatibility';
import GameInformation from './GameInformation';
import GameProperties from './GameProperties';

const GameGeneralInformation = () => {
  return (
    <>
      <GameInformation />
      <GameProperties />
      <Compatibility />
    </>
  );
};

export default GameGeneralInformation;

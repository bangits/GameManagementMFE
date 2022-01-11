import { MappingProfile } from '@automapper/core';
import { generateGameMappings, generateProviderMappings } from './mappers';

export const baseProfile: MappingProfile = (mapper) => {
  generateGameMappings(mapper);
  generateProviderMappings(mapper);
};

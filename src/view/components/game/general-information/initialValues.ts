import { EditGameInformationViewModel, EditGamePropertiesViewModel, GamesDetailsViewModel } from '@/view/models';

export const getEditGameInfoInitialValues = (data: GamesDetailsViewModel): EditGameInformationViewModel => {
  return {
    classId: data.classId || null,
    externalId: data.externalId || null,
    gameId: data.gameId || null,
    hasDemo: data.hasDemo ? '1' : '0',
    lastUpdatedUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedUserId: 1,
    name: data.gameName,
    releaseDate: new Date(data.releaseDate),
    subTypeId: data.subType?.id || null,
    gameTypeId: data.type?.id || null,
    providerId: data.providerId
  };
};
export const getEditGamePropertiesValues = (data: GamesDetailsViewModel): EditGamePropertiesViewModel => {
  return {
    featureIds: data.gameFeatures.map((featureId) => featureId.id) || null,
    gameId: data.gameId || null,
    lastUpdatedByUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedByUserId: 1,
    maxWin: data.maxWin || null,
    rtp: data.rtp || null,
    themesIds: data.gameThemes.map((theme) => theme.id) || null,
    volatilityId: data.volatilityId || null
  };
};

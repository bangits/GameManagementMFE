import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';

export const getEditGameInfoInitialValues = (
  data: GamesDetailsViewModel
): Omit<EditGameInformationViewModel, 'providerId'> => {
  return {
    classId: data.classId || null,
    externalId: data.externalId || null,
    gameId: data.gameId || null,
    hasDemo: data.hasDemo || null,
    lastUpdatedUserEmail: data.lastUpdatedByUserEmail || null,
    lastUpdatedUserId: 1,
    name: data.gameName,
    releaseDate: data.releaseDate,
    subTypeId: data.subType.id
  };
};

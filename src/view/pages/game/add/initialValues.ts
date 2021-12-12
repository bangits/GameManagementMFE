import { AddGameViewModel } from '@/view/models';

export const initialValues: AddGameViewModel = {
  providerId: null,
  externalId: '',
  name: '',
  typeId: null,
  subTypeId: null,
  releaseDate: null,
  rtp: '',
  volatilityId: 0,
  classId: null,
  hasDemo: '1',
  createdByUserId: 1,
  createdByUserEmail: 'rabelyan@bangits.com'
};

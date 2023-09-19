import { AddGameViewModel } from '@/view/models';

export const initialValues: AddGameViewModel = {
  providerId: null,
  externalId: '',
  name: '',
  categoryId: null,
  typeId: null,
  subTypeId: null,
  releaseDate: null,
  rtp: '',
  volatilityId: null,
  classId: null,
  hasDemo: '1',
  createdByUserId: 1,
  createdByUserEmail: 'rabelyan@bangits.com'
};

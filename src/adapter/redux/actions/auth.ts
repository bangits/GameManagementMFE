import { AddProviderViewModel } from '@/models';
import { InferValueTypes } from '../types';

const MODULE_NAME = 'AUTH';

export const authTypes = {
  LOGIN_REQUEST: `${MODULE_NAME}/LOGIN_REQUEST`
} as const;

export const authActions = {
  loginRequest: (addProviderViewModel: AddProviderViewModel) => ({
    type: authTypes.LOGIN_REQUEST,
    payload: addProviderViewModel
  })
};

export type AuthActions = ReturnType<InferValueTypes<typeof authActions>>;

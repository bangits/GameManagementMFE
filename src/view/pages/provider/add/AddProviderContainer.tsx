import { providerApi } from '@/adapter/redux/api';
import { AddProviderCustomErrorsEnum, AddProviderViewModel } from '@/atom-game-management';
import { AddProviderValidationSchema } from '@/domain/validators';
import { useAsync, useLoading, useTranslation, useValidationTranslation, historyService } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { FC, useCallback, useEffect, useMemo } from 'react';
import AddProvider, { AddProviderProps } from './AddProvider';
import { alert } from '@atom/design-system';
import { ROUTES } from '@/view/constants';

const AddProviderContainer: FC = () => {
  const [addProvider, { status }] = providerApi.useAddProviderMutation();

  const changeAppLoading = useLoading();

  const t = useValidationTranslation();

  const translation = useTranslation();

  const addProviderValidationSchema = useAsync(() => AddProviderValidationSchema(t), [t], null);

  const customErrors = useMemo<
    Record<AddProviderCustomErrorsEnum, { fieldKey: keyof AddProviderViewModel; errorMessage: string }[]>
  >(
    () => ({
      [AddProviderCustomErrorsEnum.PROVIDER_NAME_IS_UNIQUE]: [
        {
          fieldKey: 'providers',
          errorMessage: translation.get('moreValidation')
        }
      ],
      [AddProviderCustomErrorsEnum.LENGTH_VALIDATION]: [
        {
          fieldKey: 'providers',
          errorMessage: translation.get('providerNameIsUnique')
        }
      ]
    }),
    [t]
  );

  const onSubmit = useCallback<AddProviderProps['onSubmit']>(
    (data, form) =>
      addProvider(data)
        .unwrap()
        .then(() => form.resetForm())
        .catch((error: { message: AddProviderCustomErrorsEnum }) => {
          if (error.message) {
            customErrors[error.message]?.forEach((error) => {
              form.setFieldError(error.fieldKey, error.errorMessage);
            });
          } else {
            alert.error({
              alertLabel: translation.get('connectionError')
            });
          }
        }),
    [addProvider]
  );

  useEffect(() => {
    if (status === QueryStatus.uninitialized) return;

    if (status === QueryStatus.pending) return changeAppLoading(true);

    changeAppLoading(false);

    if (status === QueryStatus.fulfilled) {
      alert.success({
        alertLabel: translation.get('successAlertMessage')
      });
      historyService.redirectToURL(ROUTES.baseUrl + ROUTES.providers);
    }
  }, [status]);

  return <AddProvider validationSchema={addProviderValidationSchema} onSubmit={onSubmit} />;
};

export default AddProviderContainer;

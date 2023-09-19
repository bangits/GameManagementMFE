import { gameApi } from '@/adapter/redux/api';
import { addGameValidationSchema } from '@/domain/validators';
import { AddGameCustomErrorsEnum, AddGameViewModel } from '@/view/models';
import { useAsync, useLoading, useQueryString, useTranslation, useValidationTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { FC, useCallback, useEffect, useMemo } from 'react';
import AddGame, { AddGameProps } from './AddGame';

const AddGameContainer: FC = () => {
  const [addGame, { status }] = gameApi.useAddGameMutation();

  const changeAppLoading = useLoading();

  const parsedQueries = useQueryString<{ providerId: string }>();

  const t = useTranslation();
  const validationTranslations = useValidationTranslation();

  const getAddPartnerValidationSchema = useAsync(
    () => addGameValidationSchema(validationTranslations),
    [validationTranslations],
    null
  );

  const customErrors = useMemo<
    Record<AddGameCustomErrorsEnum, { fieldKey: keyof AddGameViewModel; errorMessage: string }[]>
  >(
    () => ({
      [AddGameCustomErrorsEnum.NAME]: [
        {
          fieldKey: 'name',
          errorMessage: t.get('uniqueGameName')
        }
      ]
    }),
    [t]
  );

  const onSubmit = useCallback<AddGameProps['onSubmit']>(
    ({ categoryId, typeId, subTypeId, ...data }, form) =>
      addGame({ ...data, subTypeId: subTypeId || typeId || categoryId })
        .unwrap()
        .then(() => form.resetForm())
        .catch((error: { message: AddGameCustomErrorsEnum }) => {
          if (error.message) {
            customErrors[error.message]?.forEach((error) => {
              form.setFieldError(error.fieldKey, error.errorMessage);
            });
          } else {
            alert.error({
              alertLabel: t.get('connectionError')
            });
          }
        }),
    [addGame]
  );

  useEffect(() => {
    if (status === QueryStatus.uninitialized) return;

    if (status === QueryStatus.pending) return changeAppLoading(true);

    changeAppLoading(false);

    if (status === QueryStatus.fulfilled) {
      alert.success({
        alertLabel: t.get('successAlertMessage')
      });
    }
  }, [status]);

  return (
    <AddGame
      providerId={+parsedQueries.providerId || null}
      validationSchema={getAddPartnerValidationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default AddGameContainer;

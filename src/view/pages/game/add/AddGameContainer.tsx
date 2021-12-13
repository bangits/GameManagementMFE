import { gameApi } from '@/adapter/redux/api';
import { addGameValidationSchema } from '@/domain/validators';
import { useAsync, useLoading, useTranslation, useValidationTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { FC, useCallback, useEffect } from 'react';
import AddGame, { AddGameProps } from './AddGame';

const AddGameContainer: FC = () => {
  const [addGame, { status }] = gameApi.useAddGameMutation();

  const changeAppLoading = useLoading();

  const t = useTranslation();
  const validationTranslations = useValidationTranslation();

  const onSubmit = useCallback<AddGameProps['onSubmit']>(
    (data, form) => addGame(data).then(() => form.resetForm()),
    [addGame]
  );

  const getAddPartnerValidationSchema = useAsync(
    () => addGameValidationSchema(validationTranslations),
    [validationTranslations],
    null
  );

  useEffect(() => {
    if (status === QueryStatus.uninitialized) return;

    if (status === QueryStatus.pending) return changeAppLoading(true);

    changeAppLoading(false);

    if (status === QueryStatus.fulfilled) {
      alert.success({
        alertLabel: t.get('successAlertMessage')
      });
    } else {
      alert.error({
        alertLabel: t.get('connectionError')
      });
    }
  }, [status]);

  return <AddGame validationSchema={getAddPartnerValidationSchema} onSubmit={onSubmit} />;
};

export default AddGameContainer;

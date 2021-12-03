import { providerApi } from '@/adapter/redux/api';
import { AddProviderValidationSchema } from '@/domain/validators';
import { useAsync, useLoading, useValidationTranslation } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { FC, useCallback, useEffect } from 'react';
import AddProvider, { AddProviderProps } from './AddProvider';

const AddProviderContainer: FC = () => {
  const [addProvider, { status }] = providerApi.useAddProviderMutation();

  const changeAppLoading = useLoading();

  const t = useValidationTranslation();

  const addProviderValidationSchema = useAsync(() => AddProviderValidationSchema(t), [t], null);

  const onSubmit = useCallback<AddProviderProps['onSubmit']>((data) => addProvider(data), [addProvider]);

  useEffect(() => {
    if (status === QueryStatus.pending) changeAppLoading(true);
    if (status === QueryStatus.fulfilled) changeAppLoading(false);
  }, [status]);

  return <AddProvider validationSchema={addProviderValidationSchema} onSubmit={onSubmit} />;
};

export default AddProviderContainer;

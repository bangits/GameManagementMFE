import { providerApi } from '@/adapter/redux/api';
import { CountryModel } from '@/domain/models';
import { getAddProviderValidationSchema } from '@/domain/validators';
import { PrimaryKey, useAsync, useLoading, useValidationTranslation } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { FC, useCallback, useEffect } from 'react';
import AddProvider, { AddProviderProps } from './AddProvider';

const AddProviderContainer: FC = () => {
  const [addProvider, { status }] = providerApi.useAddProviderMutation();

  const changeAppLoading = useLoading();

  const t = useValidationTranslation();

  const addProviderValidationSchema = useAsync(() => getAddProviderValidationSchema(t), [t], null);

  const transformToCountryModel = useCallback(
    (array: PrimaryKey[], defaultCountryId?: PrimaryKey): CountryModel[] =>
      array.map((countryId) => ({ countryId, defaultCurrency: countryId === defaultCountryId })),
    []
  );

  const onSubmit = useCallback<AddProviderProps['onSubmit']>(
    (data) => {
      addProvider({
        ...data,
        certifiedCountries: transformToCountryModel(data.certifiedCountries),
        providerCurrencies: transformToCountryModel(data.providerCurrencies, data.defaultCurrency),
        restrictedCountries: transformToCountryModel(data.restrictedCountries),
        targetMarkets: transformToCountryModel(data.targetMarkets)
      });
    },
    [addProvider]
  );

  useEffect(() => {
    if (status === QueryStatus.pending) changeAppLoading(true);
    if (status === QueryStatus.fulfilled) changeAppLoading(false);
  }, [status]);

  return <AddProvider validationSchema={addProviderValidationSchema} onSubmit={onSubmit} />;
};

export default AddProviderContainer;

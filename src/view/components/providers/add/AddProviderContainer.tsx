import { providerApi } from '@/adapter/redux/api';
import { CountryModel } from '@/domain/models';
import { PrimaryKey } from '@atom/common';
import { FC, useCallback, useEffect } from 'react';
import AddProvider, { AddProviderProps } from './AddProvider';

const AddProviderContainer: FC = () => {
  const [addProvider, { status }] = providerApi.useAddProviderMutation();

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
    // if (status === QueryStatus.pending) console.log('loading');
    // if (status === QueryStatus.fulfilled) console.log('done');
  }, [status]);

  return <AddProvider onSubmit={onSubmit} />;
};

export default AddProviderContainer;

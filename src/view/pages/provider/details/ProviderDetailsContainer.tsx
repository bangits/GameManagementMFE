import { providerApi } from '@/adapter/redux/api';
import React from 'react';
import ProviderDetails from './ProviderDetails';

const ProviderDetailsContainer = () => {
  const { data } = providerApi.useGetProvidersByIdQuery(5);

  return <ProviderDetails data={data} />;
};

export default ProviderDetailsContainer;

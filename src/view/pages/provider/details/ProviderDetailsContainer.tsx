import { providerApi } from '@/adapter/redux/api';
import React from 'react';
import ProviderDetails from './ProviderDetails';
import { useParams } from 'react-router-dom';

const ProviderDetailsContainer = () => {
  const params = useParams<{ providerId: string }>();

  const { data } = providerApi.useGetProvidersByIdQuery(+params.providerId);

  if (!data) return null;

  console.log(data);

  return <ProviderDetails data={data} />;
};

export default ProviderDetailsContainer;

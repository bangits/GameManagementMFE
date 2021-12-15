import { ProviderDetailsViewModel } from '@/view/models';
import React, { FC } from 'react';
import GeneralInformation from './GeneralInformation';

export interface GeneralInformationContainerProps {
  data: ProviderDetailsViewModel;
}

const GeneralInformationContainer: FC<GeneralInformationContainerProps> = ({ data }) => {
  return (
    <>
      <GeneralInformation data={data} />
    </>
  );
};

export default GeneralInformationContainer;

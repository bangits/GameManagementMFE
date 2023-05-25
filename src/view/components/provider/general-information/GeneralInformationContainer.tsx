import { providerApi } from '@/adapter/redux/api';
import { EditProviderGeneralInformationViewModel, ProviderDetailsViewModel } from '@/view/models';
import { useTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { FC, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GeneralInformation from './GeneralInformation';

export interface GeneralInformationContainerProps {
  data: ProviderDetailsViewModel;
}

const GeneralInformationContainer: FC<GeneralInformationContainerProps> = ({ data }) => {
  const t = useTranslation();

  const location = useLocation();

  const isEdit = location.search.includes('isEdit');

  const params = useParams<{ providerId: string }>();

  const [editProviderGeneralInfo] = providerApi.useEditProviderGeneralInfoMutation();

  const showSuccessAlert = useCallback(() => alert.success({ alertLabel: t.get('successAlertMessage') }), [t]);

  const showErrorAlert = useCallback(() => alert.error({ alertLabel: t.get('errorAlertMessage') }), [t]);

  const onSubmit = useCallback(
    (generalInformationData: EditProviderGeneralInformationViewModel) => {
      editProviderGeneralInfo({ providerId: +params.providerId, ...generalInformationData })
        .unwrap()
        .then(showSuccessAlert)
        .catch(showErrorAlert);
    },
    [+params.providerId]
  );

  return <GeneralInformation data={data} onSubmit={onSubmit} isEdit={isEdit} />;
};

export default GeneralInformationContainer;

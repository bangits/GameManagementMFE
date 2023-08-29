import { GeneralInformationContainer, ProviderGamesContainer } from '@/view';
import { providerImagesConfig, providerStatusesConfig } from '@/view/configs';
import { ROUTES } from '@/view/constants';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { BannerUploader, convertDate, redirectToURL, useTranslation } from '@atom/common';
import { DetailsPage, ItemDetails } from '@atom/design-system';
import { FC, useMemo } from 'react';
import { ProviderDetailsSidebar } from './ProviderDetailsSidebar';

export interface ProviderDetailsProps {
  data: ProviderDetailsViewModel;
  onActivateButtonClick: () => void;
  onInActivateButtonClick: () => void;
  shouldShowActivateButton: boolean;
  shouldShowInActivateButton: boolean;
  onBackgroundImgClick: () => void;
}

const ProviderDetails: FC<ProviderDetailsProps> = ({ data, onBackgroundImgClick }) => {
  const t = useTranslation();

  const breadCrumb = useMemo(
    () => [
      {
        label: t.get('providerManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.providers)
        }
      },
      {
        label: `${data.providerName} ${t.get('details')}`
      }
    ],
    [t, data]
  );

  const tabs = useMemo(
    () => [
      {
        title: t.get('generalInformation'),
        value: 1,
        content: <GeneralInformationContainer data={data} />
      },
      {
        title: t.get('games'),
        value: 2,
        content: (
          <ProviderGamesContainer
            providerName={data.providerName}
            providerId={data.id}
            providerStatusId={data.statusId}
          />
        ),
        disableScroll: true
      }
    ],
    [data, t]
  );

  return (
    <DetailsPage
      breadCrumbLinks={breadCrumb}
      sidebarContent={<ProviderDetailsSidebar data={data} onBackgroundImgClick={onBackgroundImgClick} />}>
      <ItemDetails defaultTabValue={1} tabs={tabs} />
    </DetailsPage>
  );
};

export default ProviderDetails;

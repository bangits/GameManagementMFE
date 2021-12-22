import { GeneralInformationContainer, ProviderGamesContainer } from '@/view';
import { providerImagesConfig, providerStatusesConfig } from '@/view/configs';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { BannerUploader, convertDate, redirectToURL, useTranslation } from '@atom/common';
import {
  PageWrapper,
  ProviderDetails as ProviderDetailsPage,
  ProviderDetailsProps as ProviderDetailsPageProps
} from '@atom/design-system';
import React, { FC, useMemo } from 'react';

export interface ProviderDetailsProps {
  data: ProviderDetailsViewModel;
  onActivateButtonClick: () => void;
  onInActivateButtonClick: () => void;
  shouldShowActivateButton: boolean;
  shouldShowInActivateButton: boolean;
  onProviderLogoChange: (logo: string) => void;
}

const ProviderDetails: FC<ProviderDetailsProps> = ({
  data,
  onActivateButtonClick,
  onInActivateButtonClick,
  shouldShowActivateButton,
  shouldShowInActivateButton,
  onProviderLogoChange
}) => {
  const t = useTranslation();

  const breadCrumb = useMemo<ProviderDetailsPageProps['breadCrumb']>(
    () => [
      {
        label: t.get('providerManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => redirectToURL('/game/providers')
        }
      },
      {
        label: `${data.providerName} ${t.get('details')}`
      }
    ],
    [t, data]
  );

  const translations = useMemo<ProviderDetailsPageProps['translations']>(
    () => ({
      totalGameCount: t.get('totalGameCount'),
      status: t.get('status'),
      creationDate: t.get('creationDate'),
      createdBy: t.get('createdBy'),
      generalInformation: t.get('generalInformation'),
      games: t.get('games'),
      editButton: t.get('edit'),
      lastUpdatedBy: t.get('lastUpdateBy'),
      lastUpdatedDate: t.get('lastUpdateDate')
    }),
    [t]
  );

  const statusInfo = useMemo<ProviderDetailsPageProps['statusInfo']>(
    () => ({
      label: t.get('status'),
      statusLabel: t.get(providerStatusesConfig[data.statusId].translationKey),
      variant: providerStatusesConfig[data.statusId].variant,
      actions: [
        ...(shouldShowActivateButton
          ? [
              {
                iconName: 'CheckButtonIcon' as const,
                onClick: onActivateButtonClick,
                tooltipText: t.get('activate')
              }
            ]
          : []),
        ...(shouldShowInActivateButton
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: onInActivateButtonClick,
                tooltipText: t.get('inActivate')
              }
            ]
          : [])
      ]
    }),
    [data, shouldShowActivateButton, shouldShowInActivateButton, t]
  );

  return (
    <PageWrapper>
      <BannerUploader
        minCropBoxWidth={providerImagesConfig.MIN_IMAGE_WIDTH}
        minCropBoxHeight={providerImagesConfig.MIN_IMAGE_HEIGHT}
        title={t.get('providerLogo')}
        onChange={onProviderLogoChange}
        initialImage={data.logo}
        aspectRatio={2 / 1}>
        {(openLogoImageUploader) => (
          <ProviderDetailsPage
            noDataText={t.get('emptyValue')}
            totalGameCount={data.gameCount ? `${data.gameCount}` : ''}
            creationDate={convertDate(data.creationDate)}
            createdBy={data.createdByUserEmail}
            translations={translations}
            statusInfo={statusInfo}
            breadCrumb={breadCrumb}
            providerId={`${t.get('id')} ${data.providerId}`}
            providerName={data.providerName}
            backgroundImgUrl={data.logo}
            onBackgroundImgClick={openLogoImageUploader}
            gamesTabContent={<ProviderGamesContainer providerId={data.id} providerStatusId={data.statusId} />}
            generalInformationContext={<GeneralInformationContainer data={data} />}
          />
        )}
      </BannerUploader>
    </PageWrapper>
  );
};

export default ProviderDetails;

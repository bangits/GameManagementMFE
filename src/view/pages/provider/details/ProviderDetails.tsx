import { GeneralInformationContainer } from '@/view';
import { providerStatusesConfig } from '@/view/configs';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { redirectToURL, useTranslation } from '@atom/common';
import {
  PageWrapper,
  ProviderDetails as ProviderDetailsPage,
  ProviderDetailsProps as ProviderDetailsPageProps
} from '@atom/design-system';
import React, { FC, useMemo } from 'react';
import { ProviderGamesContainer } from './provider-games';

export interface ProviderDetailsProps {
  data: ProviderDetailsViewModel;
  onActivateButtonClick: () => void;
  onInActivateButtonClick: () => void;
  shouldShowActivateButton: boolean;
  shouldShowInActivateButton: boolean;
}

const ProviderDetails: FC<ProviderDetailsProps> = ({
  data,
  onActivateButtonClick,
  onInActivateButtonClick,
  shouldShowActivateButton,
  shouldShowInActivateButton
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
        label: t.get('novomaticDetails')
      }
    ],
    [t]
  );

  const translations = useMemo<ProviderDetailsPageProps['translations']>(
    () => ({
      totalGameCount: t.get('totalGameCount'),
      status: t.get('status'),
      creationDate: t.get('creationDate'),
      createdBy: t.get('createdBy'),
      generalInformation: t.get('generalInformation'),
      games: t.get('games'),
      editButton: t.get('edit')
    }),
    [t]
  );

  const mainDetailsInfo = useMemo<ProviderDetailsPageProps['mainDetailsInfo']>(
    () => ({
      src: data.logo,
      label: data.providerName,
      id: `${data.providerId || t.get('emptyValue')}`
    }),
    [t, data]
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
                tooltipText: t.get('approve')
              }
            ]
          : []),
        ...(shouldShowInActivateButton
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: onInActivateButtonClick,
                tooltipText: t.get('terminate')
              }
            ]
          : [])
      ]
    }),
    []
  );

  return (
    <PageWrapper>
      <ProviderDetailsPage
        gamesTabContent={<ProviderGamesContainer />}
        noDataText={t.get('emptyValue')}
        totalGameCount={`${data.gameCount || t.get('emptyValue')}`}
        creationDate={data.creationDate}
        createdBy={data.createdByUserEmail}
        translations={translations}
        mainDetailsInfo={mainDetailsInfo}
        statusInfo={statusInfo}
        breadCrumb={breadCrumb}
        generalInformationContext={
          <>
            <GeneralInformationContainer data={data} />
          </>
        }
      />
    </PageWrapper>
  );
};

export default ProviderDetails;

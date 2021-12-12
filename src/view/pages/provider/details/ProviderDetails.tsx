import { providerStatusesConfig } from '@/view/configs';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { redirectToURL, useTranslation } from '@atom/common';
import {
  CopyField,
  Countries,
  CurrencyGroup,
  LabelGroup,
  LicenseGroup,
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
            <LabelGroup title={t.get('totalMarket')} totalLabel={`${data.targetMarkets.length} ${t.get('countries')}`}>
              <Countries />
            </LabelGroup>

            <LabelGroup
              title={t.get('certifiedCountries')}
              totalLabel={`${data.certifiedCountries.length} ${t.get('countries')}`}>
              <Countries />
            </LabelGroup>

            <LabelGroup
              title={t.get('restrictedCountries')}
              totalLabel={`${data.restrictedCountries.length} ${t.get('countries')}`}>
              <Countries />
            </LabelGroup>

            <LabelGroup
              title={t.get('supportedCurrencies')}
              totalLabel={`${data.providerCurrencies.length} ${t.get('supportedCurrencies')}`}>
              <CurrencyGroup
                currencies={[
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  },
                  {
                    title: 'YEN',
                    inactive: true
                  }
                ]}
              />
            </LabelGroup>

            <LabelGroup title={t.get('licenses')}>
              <LicenseGroup
                tags={[
                  {
                    title: 'Malta License',
                    inactive: true
                  }
                ]}
              />
            </LabelGroup>
            <LabelGroup title={t.get('absoluteRealURL')}>
              <CopyField
                label={data.absoluteUrl}
                noDataText={t.get('emptyValue')}
                tooltip={{
                  showEvent: 'click',
                  text: t.get('copied'),
                  placement: 'top'
                }}
              />
            </LabelGroup>
            <LabelGroup title={t.get('absoluteDemoURL')}>
              <CopyField
                label={data.absoluteDemoUrl}
                noDataText={t.get('emptyValue')}
                tooltip={{
                  showEvent: 'click',
                  text: t.get('copied'),
                  placement: 'top'
                }}
              />
            </LabelGroup>
          </>
        }
      />
    </PageWrapper>
  );
};

export default ProviderDetails;

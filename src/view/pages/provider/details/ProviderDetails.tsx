import { providerStatusesConfig } from '@/view/configs';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { redirectToURL, useTranslation } from '@atom/common';
import {
  PageWrapper,
  ProviderDetails as ProviderDetailsPage,
  ProviderDetailsProps as ProviderDetailsPageProps,
  ProviderGames,
  ProvidersGeneralInfo,
  ProvidersGeneralInfoProps
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

  const totalMarket = useMemo<ProvidersGeneralInfoProps['totalMarket']>(
    () => ({
      title: t.get('totalMarket'),
      total: `${data.targetMarkets.length} ${t.get('countries')}`,
      countries: data.targetMarkets
    }),
    [t, data]
  );

  const certifiedCountries = useMemo<ProvidersGeneralInfoProps['certifiedCountries']>(
    () => ({
      title: t.get('certifiedCountries'),
      total: `${data.certifiedCountries.length} ${t.get('countries')}`,
      countries: data.certifiedCountries
    }),
    [t, data]
  );

  const restrictedCountries = useMemo<ProvidersGeneralInfoProps['restrictedtCountries']>(
    () => ({
      title: t.get('restrictedCountries'),
      total: `${data.restrictedCountries.length} ${t.get('countries')}`,
      countries: data.restrictedCountries
    }),
    [t, data]
  );

  const supportedCurrencies = useMemo<ProvidersGeneralInfoProps['supportedCurrencies']>(
    () => ({
      title: t.get('supportedCurrencies'),
      total: `${data.providerCurrencies.length} ${t.get('supportedCurrencies')}`,
      currencies: data.providerCurrencies
    }),
    [t, data]
  );

  const licenses = useMemo<ProvidersGeneralInfoProps['licenses']>(
    () => ({
      title: t.get('licenses'),
      licenses: data.providerLicenses
    }),
    [t, data]
  );

  const realURL = useMemo<ProvidersGeneralInfoProps['realURL']>(
    () => ({
      URL: data.absoluteUrl,
      title: t.get('absoluteRealURL'),
      tooltip: {
        showEvent: 'click',
        text: t.get('copied'),
        placement: 'right'
      }
    }),
    [t, data]
  );

  const demoURL = useMemo<ProvidersGeneralInfoProps['demoURL']>(
    () => ({
      URL: data.absoluteDemoUrl,
      title: t.get('absoluteDemoURL'),
      tooltip: {
        showEvent: 'click',
        text: t.get('copied'),
        placement: 'right'
      }
    }),
    [t, data]
  );

  return (
    <PageWrapper>
      <ProviderDetailsPage
        gamesTabContent={
          <ProviderGames
            searchInputMaxLength={30}
            translations={{
              addGame: 'Add Game',
              noGames: 'No Games',
              search: 'Search'
            }}
            gameTypes={[
              {
                id: 1,
                name: 'Main Category',
                gameCount: 9
              },
              {
                id: 2,
                name: 'Category',
                gameCount: 29
              }
            ]}
            games={[
              {
                id: 25,
                name: 'EGT',
                icon: null
              },
              {
                id: 26,
                name: 'EGT',
                icon: null
              },
              {
                id: 27,
                name: 'EGT',
                icon: null
              },
              {
                id: 28,
                name: 'EGT',
                icon: null
              },
              {
                id: 29,
                name: 'EGT',
                icon: null
              },
              {
                id: 30,
                name: 'քոեռտըւ',
                icon: null
              },
              {
                id: 31,
                name: 'ԱԱԱՍՍՍԲԲԲԲԲ',
                icon: null
              },
              {
                id: 32,
                name: '                                                 1',
                icon: null
              },
              {
                id: 33,
                name: 'սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ  ',
                icon: null
              },
              {
                id: 34,
                name: 'սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ %  ',
                icon: null
              },
              {
                id: 35,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 36,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 37,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 38,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 39,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 40,
                name: '!@#$%^&&^%$#@#$F%^%$#',
                icon: null
              },
              {
                id: 41,
                name: 'stringfg',
                icon: null
              },
              {
                id: 42,
                name: 'string',
                icon: null
              },
              {
                id: 43,
                name: 'string',
                icon: null
              }
            ]}
            onChange={console.log}
            onGameClick={console.log}
            onAddGameClick={console.log}
            isLoadingGames={false}
          />
        }
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
            <ProvidersGeneralInfo
              noDataText={t.get('emptyValue')}
              totalMarket={totalMarket}
              certifiedCountries={certifiedCountries}
              restrictedtCountries={restrictedCountries}
              supportedCurrencies={supportedCurrencies}
              licenses={licenses}
              realURL={realURL}
              demoURL={demoURL}
            />
          </>
        }
      />
    </PageWrapper>
  );
};

export default ProviderDetails;

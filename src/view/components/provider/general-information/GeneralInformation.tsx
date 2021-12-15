import { ProviderDetailsViewModel } from '@/view/models';
import { CountriesSelect, createRenderInputs, CustomSelectProps, useTranslation } from '@atom/common';
import { FlexibleForm, FlexibleFormProps, ProvidersGeneralInfo, ProvidersGeneralInfoProps } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import React, { FC, useMemo } from 'react';

export interface GeneralInformationProps {
  data: ProviderDetailsViewModel;
}

const GeneralInformation: FC<GeneralInformationProps> = ({ data }) => {
  const t = useTranslation();

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

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      fields: [
        {
          type: 'select' as const,
          name: 'legalEntityId',
          label: t.get('legalEntity'),
          component: (props: CustomSelectProps) => {
            return <CountriesSelect {...props} fullWidth inputLabel={t.get('legalEntity')} />;
          }
        },
        {
          type: 'select' as const,
          name: 'legalEntityId',
          label: t.get('legalEntity'),
          component: (props: CustomSelectProps) => {
            return <CountriesSelect {...props} fullWidth inputLabel={t.get('legalEntity')} />;
          }
        },
        {
          type: 'input' as const,
          name: 'address',
          label: t.get('address')
        },
        {
          type: 'input' as const,
          name: 'postalAddress',
          label: t.get('postalAddress')
        },
        {
          type: 'input' as const,
          name: 'zipCode',
          label: t.get('zipCode')
        },
        {
          type: 'input' as const,
          name: 'tin',
          label: t.get('tin')
        },
        {
          type: 'input' as const,
          name: 'vat',
          label: t.get('vat')
        },
        {
          type: 'datepicker' as const,
          name: 'companyRegistrationDate',
          label: t.get('registrationDate')
        },
        {
          type: 'input' as const,
          name: 'registrationNumber',
          label: t.get('registrationNumber')
        },
        {
          type: 'input' as const,
          name: 'website',
          label: t.get('website')
        }
      ],
      renderInputs
    }),
    []
  );

  return (
    //@ts-expect-error rgsdgdfg
    <Formik onSubmit={() => console.log} initialValues={{ website: '' }} validationSchema={{}} >
      {(form) => {
        return (
          <Form noValidate >
            <FlexibleForm
              title=''
              col={12}
              editedFormProps={{
                options: [],
                viewMoreLabel: 'View More'
              }}
              editFormProps={editFormProps}
              editedModeChildren={
                <>
                  <ProvidersGeneralInfo
                    noDataText={t.get('notCompleted')}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default GeneralInformation;

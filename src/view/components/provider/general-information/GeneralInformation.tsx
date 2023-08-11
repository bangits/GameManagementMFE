import { editProviderGeneralInfoValidations } from '@/domain/validators';
import { EditProviderGeneralInformationViewModel, ProviderDetailsViewModel } from '@/view/models';
import {
  copyToClipboard,
  CountriesSelect,
  createRenderInputs,
  CurrencySelect,
  CustomForm,
  CustomSelect,
  CustomSelectProps,
  historyService,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import { FlexibleForm, FlexibleFormProps, ProvidersGeneralInfo, ProvidersGeneralInfoProps } from '@atom/design-system';
import { FastField, Form } from 'formik';
import React, { FC, useMemo } from 'react';
import { editProviderGeneralInfoInitialValues } from './initialValues';
import { css } from 'styled-system/css';

export interface GeneralInformationProps {
  data: ProviderDetailsViewModel;
  onSubmit: (data: Omit<EditProviderGeneralInformationViewModel, 'providerId'>) => void;
  isEdit: boolean;
}

const GeneralInformation: FC<GeneralInformationProps> = ({ data, onSubmit, isEdit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const totalMarket = useMemo<ProvidersGeneralInfoProps['totalMarket']>(
    () =>
      data.targetMarkets.length > 1
        ? {
            title: t.get('targetMarkets'),
            total: `${data.targetMarkets.length} ${t.get('countries')}`,
            countries: data.targetMarkets.map((markets) => ({ tagName: markets.tagName, imgSrc: markets.imgSrc }))
          }
        : {
            title: t.get('targetMarkets'),
            countries: data.targetMarkets.map((markets) => ({ tagName: markets.tagName, imgSrc: markets.imgSrc }))
          },
    [t, data]
  );

  const certifiedCountries = useMemo<ProvidersGeneralInfoProps['certifiedCountries']>(
    () =>
      data.certifiedCountries.length > 1
        ? {
            title: t.get('certifiedCountries'),
            total: `${data.certifiedCountries.length} ${t.get('countries')}`,
            countries: data.certifiedCountries.map((country) => ({ tagName: country.tagName, imgSrc: country.imgSrc }))
          }
        : {
            title: t.get('certifiedCountries'),
            countries: data.certifiedCountries.map((country) => ({ tagName: country.tagName, imgSrc: country.imgSrc }))
          },
    [t, data]
  );

  const restrictedCountries = useMemo<ProvidersGeneralInfoProps['restrictedCountries']>(
    () =>
      data.restrictedCountries.length > 1
        ? {
            title: t.get('restrictedCountries'),
            total: `${data.restrictedCountries.length} ${t.get('countries')}`,
            countries: data.restrictedCountries.map((country) => ({ tagName: country.tagName, imgSrc: country.imgSrc }))
          }
        : {
            title: t.get('restrictedCountries'),
            countries: data.restrictedCountries.map((country) => ({ tagName: country.tagName, imgSrc: country.imgSrc }))
          },
    [t, data]
  );

  const supportedCurrencies = useMemo<ProvidersGeneralInfoProps['supportedCurrencies']>(
    () =>
      data.providerCurrencies.length > 1
        ? {
            title: t.get('supportedCurrencies'),
            total: `${data.providerCurrencies.length} ${t.get('supportedCurrencies')}`,
            currencies: data.providerCurrencies
          }
        : { title: t.get('supportedCurrencies'), currencies: data.providerCurrencies },
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
      },
      onClick: () => {
        copyToClipboard(data.absoluteUrl);
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
      },
      onClick: () => {
        copyToClipboard(data.absoluteDemoUrl);
      }
    }),
    [t, data]
  );

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      applyButtonTooltipText: t.get('apply'),
      closeButtonTooltipText: t.get('close'),
      fields: [
        {
          type: 'select' as const,
          name: 'targetMarketsId',
          label: t.get('targetMarket'),
          component: (props: CustomSelectProps) => {
            return (
              <CountriesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('targetMarkets')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'certifiedCountriesId',
          label: t.get('certifiedCountries'),
          component: (props: CustomSelectProps) => {
            return (
              <CountriesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('certifiedCountries')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'restrictedCountriesId',
          label: t.get('restrictedCountries'),
          component: (props: CustomSelectProps) => {
            return (
              <CountriesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('restrictedCountries')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'providerCurrenciesId',
          label: t.get('providerCurrencies'),
          component: (props: CustomSelectProps) => {
            return (
              <CurrencySelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('supportedCurrencies')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'licensesId',
          label: t.get('licenses'),
          component: (props: CustomSelectProps) => {
            return (
              <CustomSelect
                {...props}
                isMulti
                options={[
                  {
                    label: 'Malta License',
                    value: 1
                  }
                ]}
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('licenses')}
              />
            );
          }
        },
        {
          type: 'input' as const,
          name: 'absoluteRealUrl',
          label: t.get('absoluteRealURL')
        },
        {
          type: 'input' as const,
          name: 'absoluteDemoUrl',
          label: t.get('absoluteDemoURL')
        }
      ],
      renderInputs
    }),
    []
  );
  const initialValues = useMemo(() => editProviderGeneralInfoInitialValues(data), [data]);
  const editProviderGeneralInfoValidationSchema = useAsync(
    () => editProviderGeneralInfoValidations(translationValidations),
    [translationValidations],
    null
  );
  return (
    <CustomForm
      showKeepChangesModal
      onSubmit={(data, _, isValuesSameAsInitialValues) => {
        if (!isValuesSameAsInitialValues) onSubmit(data);
      }}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={editProviderGeneralInfoValidationSchema}>
      {(form) => {
        return (
          <Form className={css({ width: '100%' })} noValidate>
            <FlexibleForm
              title=''
              isEdit={isEdit}
              col={12}
              editedFormProps={{
                options: [],
                viewMoreLabel: t.get('viewMore'),
                viewLessLabel: t.get('viewLess'),
                editButtonTooltipText: t.get('edit')
              }}
              onClose={() => historyService.unblock()}
              onSubmit={async (onClose) => {
                await form.submitForm();

                const errors = await form.validateForm();

                if (!Object.values(errors).length) onClose();
              }}
              editFormProps={editFormProps}
              editedModeChildren={
                <>
                  <ProvidersGeneralInfo
                    noDataText={t.get('emptyValue')}
                    totalMarket={totalMarket}
                    certifiedCountries={certifiedCountries}
                    restrictedCountries={restrictedCountries}
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
    </CustomForm>
  );
};

export default GeneralInformation;

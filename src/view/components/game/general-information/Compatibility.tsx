import { editGameCompatibilityValidations } from '@/domain/validators';
import { EditGameCompatibilityViewModel, GamesDetailsViewModel } from '@/view/models';
import {
  CountriesSelect,
  createRenderInputs,
  CurrencySelect,
  CustomSelectProps,
  LanguageSelect,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import {
  BrowsersCheckboxGroup,
  CompatibilityCheckboxesGroup,
  CompatibilityCheckboxesGroupProps,
  EditFormFields,
  FlexibleForm,
  FlexibleFormProps,
  GameCompatibility,
  GameCompatibilityProps,
  LabelGroup
} from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import React, { FC, useMemo } from 'react';
import { getEditGameCompatibilityValues } from './initialValues';

export interface CompatibilityProps {
  data: GamesDetailsViewModel;
  isEdit: boolean;
  onSubmit: (data: EditGameCompatibilityViewModel) => void;
}

const Compatibility: FC<CompatibilityProps> = ({ data, isEdit, onSubmit }) => {
  enum SupportedBrowsersEnum { //Needs to create in enums section
    SAFARI = 1,
    CHROME,
    FIREFOX,
    EDGE,
    OPERA
  }

  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const translations = useMemo<GameCompatibilityProps['translations']>(
    () => ({
      certifiedCountries: t.get('certifiedCountries'),
      currencies: t.get('currencies'),
      desktop: t.get('desktop'),
      devices: t.get('devices'),
      landscape: t.get('landscape'),
      mobile: t.get('mobile'),
      mobileScreenMode: t.get('mobileScreenMode'),
      noDataText: t.get('notCompleted'),
      operatingLanguages: t.get('operatingLanguages'),
      portrait: t.get('portrait'),
      restrictedCountries: t.get('restrictedCountries'),
      supportedBrowsers: t.get('supportedBrowsers'),
      tableScreenMode: t.get('tableScreenMode'),
      tablet: t.get('tablet'),
      uiLanguages: t.get('uiLanguages')
    }),
    [t]
  );

  const compatibilityCheckboxesTranslations = useMemo<CompatibilityCheckboxesGroupProps['translations']>(
    () => ({
      desktop: t.get('desktop'),
      landscape: t.get('landscape'),
      mobile: t.get('mobile'),
      mobileScreenMode: t.get('mobileScreenMode'),
      platform: t.get('platform'),
      portrait: t.get('portrait'),
      tablet: t.get('tablet'),
      tabletScreenMode: t.get('tabletScreenMode')
    }),
    [t]
  );

  const compatibilityFields = useMemo<FlexibleFormProps['editFormProps']['fields']>(
    () => [
      {
        type: 'select' as const,
        name: 'uiLanguageIds',
        label: t.get('uiLanguages'),
        component: (props: CustomSelectProps) => {
          return (
            <LanguageSelect
              {...props}
              isMulti
              selectAll
              selectAllLabel={t.get('all')}
              clearButton
              clearButtonLabel={t.get('clear')}
              fullWidth
              inputLabel={t.get('uiLanguages')}
            />
          );
        }
      },
      {
        type: 'select' as const,
        name: 'operatingLanguagesIds',
        label: t.get('operatingLanguages'),
        component: (props: CustomSelectProps) => {
          return (
            <LanguageSelect
              {...props}
              isMulti
              selectAll
              selectAllLabel={t.get('all')}
              clearButton
              clearButtonLabel={t.get('clear')}
              fullWidth
              inputLabel={t.get('operatingLanguages')}
            />
          );
        }
      },
      {
        type: 'select' as const,
        name: 'certifiedCountryIds',
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
        name: 'restrictedCountryIds',
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
        name: 'supportedCurrencyIds',
        label: t.get('supportedCurrencies'),
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
      }
    ],
    [t]
  );

  const supportedBrowsers = useMemo<GameCompatibilityProps['supportedBrowsers']>(
    () => ({
      browsersEnum: SupportedBrowsersEnum,
      initialValues: data.gameSupportedBrowsers.map((browser) => browser.id),
      disabled: true
    }),
    [data]
  );

  const editGameCompatibilityValidationScheme = useAsync(
    () => editGameCompatibilityValidations(translationValidations),
    [translationValidations],
    null
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={getEditGameCompatibilityValues(data)}
      validationSchema={editGameCompatibilityValidationScheme}>
      {(form) => {
        return (
          <Form noValidate>
            <FlexibleForm
              onSubmit={async (onClose) => {
                await form.submitForm();

                const errors = await form.validateForm();

                if (!Object.values(errors).length) onClose();
              }}
              isEdit={isEdit}
              noDataText={t.get('emptyValue')}
              title={t.get('compatibility')}
              col={12}
              editedFormProps={{
                viewMoreLabel: 'View More',
                options: []
              }}
              editFormProps={{
                fields: [],
                renderInputs
              }}
              editModeChildren={
                <>
                  <CompatibilityCheckboxesGroup
                    translations={compatibilityCheckboxesTranslations}
                    platformCheckboxesValues={{
                      mobile: 1,
                      desktop: 2,
                      tablet: 3
                    }}
                    mobileCheckboxesValues={{
                      portrait: 1,
                      landscape: 2
                    }}
                    tabletCheckboxesValues={{
                      portrait: 1,
                      landscape: 2
                    }}
                  />
                  <div className='details-form-wrapper'>
                    <EditFormFields fields={compatibilityFields} renderInputs={renderInputs} />
                  </div>
                  <LabelGroup title={t.get('supportedBrowsers')}>
                    <BrowsersCheckboxGroup
                      browsersEnum={SupportedBrowsersEnum}
                      initialValues={data.gameSupportedBrowsers.map((browser) => browser.id)}
                      onChange={(values) => {
                        form.setFieldValue('supportedBrowserIds', values);
                      }}
                    />
                  </LabelGroup>
                </>
              }
              editedModeChildren={
                <GameCompatibility
                  translations={translations}
                  devices={[1, 2, 3]}
                  mobilePortrait={data.mobileScreenModeIsPortrait}
                  mobileLandscape={data.mobileScreenModeIsLandscape}
                  desktopPortrait={data.tabletScreenModeIsPortrait}
                  desktopLandscape={data.tabletScreenModeIsLandscape}
                  uiLanguages={data.gameUILanguages.map((language) => ({ title: language?.title }))}
                  operatingLanguages={data.gameOperatingLanguages.map((language) => ({ title: language?.title }))}
                  certifiedCountries={data.gameCertifiedCountries.map((country) => ({
                    tagName: country?.tagName,
                    imgSrc: country?.imgURL
                  }))}
                  restrictedCountries={data.gameRestrictedCountries.map((country) => ({
                    tagName: country?.tagName,
                    imgSrc: country?.imgURL
                  }))}
                  currencies={data.gameCurrencies.map((currency) => ({ title: currency?.title }))}
                  supportedBrowsers={supportedBrowsers}
                />
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Compatibility;

import { editGameCompatibilityValidations } from '@/domain/validators';
import { EditGameCompatibilityViewModel, GamesDetailsViewModel } from '@/view/models';
import {
  CountriesSelect,
  createRenderInputs,
  CurrencySelect,
  CustomForm,
  CustomSelectProps,
  historyService,
  LanguageSelect,
  SupportedBrowsersEnum,
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
  LabelGroup
} from '@atom/design-system';
import { FastField, Form } from 'formik';
import { FC, useMemo } from 'react';
import { getEditGameCompatibilityValues } from './initialValues';
import GameCompatibility, { GameCompatibilityProps } from './GameCompatibility';
import { css } from 'styled-system/css';

export interface CompatibilityProps {
  data: GamesDetailsViewModel;
  isEdit: boolean;
  onSubmit: (data: EditGameCompatibilityViewModel) => void;
}

const Compatibility: FC<CompatibilityProps> = ({ data, isEdit, onSubmit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const translations = useMemo<GameCompatibilityProps['translations']>(
    () => ({
      certifiedCountries: t.get('certifiedCountries'),
      currencies: t.get('supportedCurrencies'),
      desktop: t.get('desktop'),
      devices: t.get('devices'),
      landscape: t.get('landscape'),
      mobile: t.get('mobile'),
      mobileScreenMode: t.get('mobileScreenMode'),
      noDataText: t.get('emptyValue'),
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
      platform: t.get('devices'),
      portrait: t.get('portrait'),
      tablet: t.get('tablet'),
      tabletScreenMode: t.get('tableScreenMode')
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

  const editGameCompatibilityValidationScheme = useAsync(
    () => editGameCompatibilityValidations(translationValidations),
    [translationValidations],
    null
  );
  const initialValues = useMemo(() => getEditGameCompatibilityValues(data), [data]);

  return (
    <CustomForm
      showKeepChangesModal
      onSubmit={(data, _, isValuesSameAsInitialValues) => {
        if (!isValuesSameAsInitialValues) onSubmit(data);
      }}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={editGameCompatibilityValidationScheme}>
      {(form) => {
        return (
          <Form className={css({ width: '100%' })} noValidate>
            <FlexibleForm
              onClose={() => historyService.unblock()}
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
                viewMoreLabel: t.get('viewMore'),
                viewLessLabel: t.get('viewLess'),
                options: [],
                editButtonTooltipText: t.get('edit')
              }}
              editFormProps={{
                fields: [],
                renderInputs,
                applyButtonTooltipText: t.get('apply'),
                closeButtonTooltipText: t.get('close')
              }}
              editModeChildren={
                <>
                  <CompatibilityCheckboxesGroup
                    translations={compatibilityCheckboxesTranslations}
                    platformInitialValues={data.gamePlatformGames.map((platform) => platform.id)}
                    mobileInitialValues={[
                      ...(data.mobileScreenModeIsPortrait ? [1] : []),
                      ...(data.mobileScreenModeIsLandscape ? [2] : [])
                    ]}
                    tabletInitialValues={[
                      ...(data.tabletScreenModeIsPortrait ? [1] : []),
                      ...(data.tabletScreenModeIsLandscape ? [2] : [])
                    ]}
                    platformCheckboxesValues={{
                      mobile: 1,
                      tablet: 2,
                      desktop: 3
                    }}
                    mobileCheckboxesValues={{
                      portrait: 1,
                      landscape: 2
                    }}
                    tabletCheckboxesValues={{
                      portrait: 1,
                      landscape: 2
                    }}
                    onMobileModeChange={(values) => {
                      form.setFieldValue('mobileScreenModeIsPortrait', values.includes(1));
                      form.setFieldValue('mobileScreenModeIsLandscape', values.includes(2));
                    }}
                    onTabletModeChange={(values) => {
                      form.setFieldValue('tabletScreenModeIsPortrait', values.includes(1));
                      form.setFieldValue('tabletScreenModeIsLandscape', values.includes(2));
                    }}
                    onPlatformChange={(values) => {
                      form.setFieldValue('platformIds', values);

                      form.setFieldValue('mobileScreenModeIsPortrait', values.includes(1));
                      form.setFieldValue('mobileScreenModeIsLandscape', values.includes(1));
                      form.setFieldValue('tabletScreenModeIsPortrait', values.includes(2));
                      form.setFieldValue('tabletScreenModeIsLandscape', values.includes(2));
                    }}
                  />
                  <div className='details-form-wrapper'>
                    <EditFormFields fields={compatibilityFields} renderInputs={renderInputs} />
                  </div>
                  <LabelGroup title={t.get('supportedBrowsers')}>
                    <BrowsersCheckboxGroup
                      browsersEnum={SupportedBrowsersEnum}
                      values={form.values.supportedBrowserIds}
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
                  devices={data.gamePlatformGames.map((platform) => platform.id)}
                  mobilePortrait={data.mobileScreenModeIsPortrait}
                  mobileLandscape={data.mobileScreenModeIsLandscape}
                  desktopPortrait={data.tabletScreenModeIsPortrait}
                  desktopLandscape={data.tabletScreenModeIsLandscape}
                  uiLanguages={data.gameUILanguages?.map((language) => ({ title: language?.title })) || []}
                  operatingLanguages={data.gameOperatingLanguages?.map((language) => ({ title: language?.title }))}
                  certifiedCountries={
                    data.gameCertifiedCountries?.map((country) => ({
                      tagName: country?.tagName,
                      imgSrc: country?.imgURL
                    })) || []
                  }
                  restrictedCountries={data.gameRestrictedCountries.map((country) => ({
                    tagName: country?.tagName,
                    imgSrc: country?.imgURL
                  }))}
                  currencies={data.gameCurrencies?.map((currency) => ({ title: currency?.title })) || []}
                  supportedBrowsers={{
                    browsersEnum: SupportedBrowsersEnum,
                    initialValues: data.gameSupportedBrowsers.map((browser) => browser.name),
                    disabled: true
                  }}
                />
              }
            />
          </Form>
        );
      }}
    </CustomForm>
  );
};

export default Compatibility;

import { ROUTES } from '@/view/constants';
import { AddProviderViewModel } from '@/view/models';
import {
  ChangedSelect,
  CountriesSelect,
  createRenderInputs,
  CurrencySelect,
  CustomSelectProps,
  historyService,
  SelectOptionType,
  useTranslation
} from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Field, Form, Formik, FormikProps, FormikHelpers } from 'formik';
import { FC, useMemo, useRef } from 'react';
import { SchemaOf } from 'yup';
import { initialValues } from './initialValues';
import { BrandNameSelect, AtomPartnerProvider } from '@atom/partner-management';

export interface AddProviderProps {
  onSubmit: (data: AddProviderViewModel, form: FormikHelpers<typeof initialValues>) => void;

  validationSchema: SchemaOf<AddProviderViewModel> | null;
}

const AddProvider: FC<AddProviderProps> = ({ onSubmit, validationSchema }) => {
  const selectedAggregatorName = useRef<string>(null);
  const selectedProviderName = useRef<string>(null);

  const t = useTranslation();

  const atomFormFields = useMemo(
    () => [
      {
        type: 'select' as const,
        name: 'partnerId',
        component: (props) => {
          return (
            <AtomPartnerProvider>
              <BrandNameSelect
                {...props}
                onChange={(value, _, options) => {
                  props.onChange(value);

                  selectedAggregatorName.current = options.find((o) => o.value === value)?.label;
                }}
                fullWidth
                inputLabel={t.get('aggregator')}
              />
            </AtomPartnerProvider>
          );
        }
      },
      {
        type: 'input' as const,
        name: 'input'
      },
      {
        type: 'input' as const,
        name: 'absoluteDemoUrl',
        label: t.get('absoluteDemoURL'),
        props: {
          label: t.get('companyLogoType')
        }
      },

      {
        type: 'input' as const,
        name: 'absoluteRealUrl',
        label: t.get('absoluteRealURL'),
        props: {}
      },
      {
        type: 'from-to-input' as const,
        col: 12,
        name: 'providers' as keyof AddProviderViewModel,
        label: t.get('providerName'),
        props: {
          fromToProps: {
            toInputProps: {
              placeholder: t.get('providerExternalId')
            },
            fromInputProps: !selectedProviderName.current
              ? {
                  explanation: 'Add Provider',
                  color: 'danger',
                  placeholder: t.get('providerName')
                }
              : { placeholder: t.get('providerName') }
          },
          toolTipTitle: 'click'
        }
      }
    ],
    [t]
  );

  const atomFormProps = useMemo(
    () => ({
      title: t.get('addProvider'),
      secondButtonProps: {
        children: t.get('save')
      },
      firstButtonProps: {
        children: t.get('close'),
        type: 'button' as const,
        onClick: () => historyService.redirectToURL(ROUTES.baseUrl + ROUTES.providers + ROUTES.providersList)
      }
    }),
    [t]
  );

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, formikHelpers) => {
        console.log(data);

        if (!data.providers.length) return;
        onSubmit({ ...data, partnerName: selectedAggregatorName.current }, formikHelpers);
      }}>
      {(form) => {
        return (
          <Form noValidate className='min-height-content-wrapper'>
            <AtomForm renderInputs={renderInputs} fields={atomFormFields} {...atomFormProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProvider;

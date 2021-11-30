import { ROUTES } from '@/view/constants';
import { AddProviderViewModel } from '@/view/models';
import {
  ChangedSelect,
  CountriesSelect,
  createRenderInputs,
  CurrencySelect,
  CustomSelectProps,
  redirectToURL,
  SelectOptionType,
  useTranslation
} from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Field, Form, Formik, FormikProps } from 'formik';
import { FC, useMemo, useState } from 'react';
import { SchemaOf } from 'yup';
import { initialValues } from './initialValues';

export interface AddProviderProps {
  onSubmit: (data: typeof initialValues) => void;
  validationSchema: SchemaOf<AddProviderViewModel> | null;
}

const AddProvider: FC<AddProviderProps> = ({ onSubmit, validationSchema }) => {
  const t = useTranslation();

  const [selectedProviderCurrencies, setSelectedProviderCurrencies] = useState<SelectOptionType[]>([]);

  const atomFormFields = useMemo(
    () => [
      {
        type: 'input' as const,
        name: 'name',
        label: t.get('providers.fields.providerName')
      },
      {
        type: 'select' as const,
        name: 'targetMarkets',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti fullWidth inputLabel={t.get('providers.fields.targetMarkets')} />
        )
      },
      {
        type: 'select' as const,
        name: 'certifiedCountries',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti fullWidth inputLabel={t.get('providers.fields.certifiedCountries')} />
        )
      },
      {
        type: 'select' as const,
        name: 'restrictedCountries',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti fullWidth inputLabel={t.get('providers.fields.restrictedCountries')} />
        )
      },
      {
        type: 'custom' as const,
        name: 'providerCurrencies',
        component: () => (
          <ChangedSelect
            field={FastField}
            name='providerCurrencies'
            inputLabel={t.get('providers.fields.providerCurrencies')}
            component={CurrencySelect}
            isMulti
            fullWidth
            onChangeOptions={async (updatedOptions, form: FormikProps<typeof initialValues>) => {
              if (!updatedOptions.find((o) => o.value === form.values.defaultCurrency))
                await form.setFieldValue('defaultCurrency', 0);

              setSelectedProviderCurrencies(updatedOptions);
            }}
          />
        )
      },
      {
        type: 'select' as const,
        name: 'defaultCurrency',
        props: {
          inputLabel: t.get('providers.fields.defaultCurrency'),
          options: selectedProviderCurrencies,
          isSearchable: true
        },
        additionalProps: {
          field: Field
        }
      },
      {
        type: 'input' as const,
        name: 'logo',
        label: t.get('providers.fields.logo')
      }
    ],
    [selectedProviderCurrencies, t]
  );

  const atomFormProps = useMemo(
    () => ({
      title: t.get('providers.add.form.title'),
      secondButtonProps: {
        children: t.get('form.save')
      },
      firstButtonProps: {
        children: t.get('form.cancel'),
        type: 'button' as const,
        onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.providers + ROUTES.providersList)
      }
    }),
    [t]
  );

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => {
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

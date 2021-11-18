import { ROUTES } from '@/constants';
import { ChangedSelect } from '@/view';
import {
  CountriesSelect,
  CurrencySelect,
  CustomSelectProps,
  redirectToURL,
  SelectOptionType,
  useTranslation
} from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FC, useCallback, useMemo, useState } from 'react';
import { initialValues } from './initialValues';

export interface AddProviderProps {
  onSubmit: (data: typeof initialValues) => void;
}

const AddProvider: FC<AddProviderProps> = ({ onSubmit }) => {
  const t = useTranslation();

  const [selectedProviderCurrencies, setSelectedProviderCurrencies] = useState<SelectOptionType[]>([]);

  const atomFormFields = useMemo(
    () => [
      {
        type: 'input' as const,
        name: 'name',
        props: {
          label: t.get('providers.add.fields.providerName')
        }
      },
      {
        type: 'select' as const,
        name: 'targetMarkets',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti inputLabel={t.get('providers.add.fields.targetMarkets')} />
        )
      },
      {
        type: 'select' as const,
        name: 'certifiedCountries',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti inputLabel={t.get('providers.add.fields.certifiedCountries')} />
        )
      },
      {
        type: 'select' as const,
        name: 'restrictedCountries',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti inputLabel={t.get('providers.add.fields.restrictedCountries')} />
        )
      },
      {
        type: 'custom' as const,
        name: 'providerCurrencies',
        component: () => (
          <ChangedSelect
            name='providerCurrencies'
            inputLabel={t.get('providers.add.fields.providerCurrencies')}
            component={CurrencySelect}
            isMulti
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
          inputLabel: t.get('providers.add.fields.defaultCurrency'),
          options: selectedProviderCurrencies,
          isSearchable: true
        }
      },
      {
        type: 'input' as const,
        name: 'logo',
        props: {
          label: t.get('providers.add.fields.logo')
        }
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

  const renderInputs = useCallback((Component: (props: any) => JSX.Element, name: string, fieldType: string) => {
    return (
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => {
          return (
            <>
              <Component
                {...field}
                onChange={async (evt) => {
                  await form.setFieldValue(name, fieldType === 'input' ? evt.target.value : evt);
                  form.setFieldTouched(name, true);
                }}
                name={name}
                explanation={meta.touched && meta.error}
                color={meta.error && meta.touched ? 'danger' : undefined}
              />
            </>
          );
        }}
      </Field>
    );
  }, []);

  return (
    <Formik initialValues={initialValues} validationSchema={addProviderValidationSchema} onSubmit={onSubmit}>
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

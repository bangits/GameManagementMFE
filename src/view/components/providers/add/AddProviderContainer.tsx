import { addProviderValidationSchema } from '@/validators/addProviderValidations';
import { ChangedSelect } from '@/view';
import { CountriesSelect, CurrencySelect, CustomSelectProps, SelectOptionType } from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FC, useCallback, useMemo, useState } from 'react';

type ProviderActions = {};

type ProviderContainerProps = {} & ProviderActions;

const initialValues = {
  name: '',
  logo: '',
  providerCurrencies: [],
  defaultCurrency: 0,
  targetMarkets: [],
  restrictedCountries: [],
  certifiedCountries: []
};

const AddProviderContainer: FC<ProviderContainerProps> = () => {
  const [selectedProviderCurrencies, setSelecetedProviderCurrencies] = useState<SelectOptionType[]>([]);

  const atomFormProps = useMemo(
    () => ({
      title: 'Add provider',
      fields: [
        {
          type: 'input' as const,
          name: 'name',
          props: {
            label: 'Provider Name'
          }
        },
        {
          type: 'select' as const,
          name: 'targetMarkets',
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Target Markets' />
        },
        {
          type: 'select' as const,
          name: 'certifiedCountries',
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Certified Countries' />
        },
        {
          type: 'select' as const,
          name: 'restrictedCountries',
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Restricted Countries' />
        },
        {
          type: 'custom' as const,
          name: 'providerCurrencies',
          component: () => (
            <ChangedSelect
              name='providerCurrencies'
              inputLabel='Provider Currencies'
              component={CurrencySelect}
              isMulti
              onChangeOptions={async (updatedOptions, form: FormikProps<typeof initialValues>) => {
                if (!updatedOptions.find((o) => o.value === form.values.defaultCurrency))
                  await form.setFieldValue('defaultCurrency', 0);

                setSelecetedProviderCurrencies(updatedOptions);
              }}
            />
          )
        },
        {
          type: 'select' as const,
          name: 'defaultCurrency',
          props: {
            inputLabel: 'Default currency',
            options: selectedProviderCurrencies,
            isSearchable: true
          }
        },
        {
          type: 'input' as const,
          name: 'logo',
          props: {
            label: 'Logo'
          }
        }
      ],
      secondButtonProps: {
        children: 'Save'
      },
      firstButtonProps: {
        children: 'Cancel'
      }
    }),
    [selectedProviderCurrencies]
  );

  const renderInputs = useCallback(
    (Component: (props: any) => JSX.Element, name: string, fieldType: string) => {
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
    },
    [selectedProviderCurrencies]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProviderValidationSchema}
      onSubmit={(value) => {
        console.log(value);
      }}>
      {(form) => {
        console.log(form);

        return (
          <Form noValidate>
            <AtomForm renderInputs={renderInputs} {...atomFormProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProviderContainer;

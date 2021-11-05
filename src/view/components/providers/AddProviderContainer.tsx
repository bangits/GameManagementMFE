import { addProviderValidationSchema } from '@/validators/addProviderValidations';
import { CountriesSelect, CustomSelectProps, CurrencySelect } from '@atom/common';
// @ts-ignore
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useCallback, useMemo, useState } from 'react';
import { DefaultCurrencyField } from './DefaultCurrencyField';

type ProviderActions = {};

type ProviderContainerProps = {} & ProviderActions;

const AddProviderContainer: FC<ProviderContainerProps> = () => {
  const atomFormProps = useMemo(
    () => ({
      title: 'Add provider',
      fields: [
        {
          type: 'input',
          name: 'name',
          props: {
            label: 'Provider Name'
          }
        },
        {
          type: 'select',
          name: 'targetMarkets',
          isSearchable: true,
          isMulti: true,
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Target Markets' />
        },
        {
          type: 'select',
          name: 'certifiedCountries',
          isSearchable: true,
          isMulti: true,
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Certified Countries' />
        },
        {
          type: 'select',
          name: 'restrictedCountries',
          isSearchable: true,
          isMulti: true,
          component: (props: CustomSelectProps) => <CountriesSelect {...props} inputLabel='Restricted Countries' />
        },
        {
          type: 'select',
          name: 'providerCurrencies',
          isMulti: true,
          props: {
            options: [
              {
                label: 'Test',
                value: 1
              }
            ],
            isMulti: true
          }
        },
        {
          type: 'select',
          name: 'defaultCurrency',
          props: {
            inputLabel: 'Default currency',
            options: [
              { label: 'Default currency 1', value: 1 },
              { label: 'Default currency 2', value: 2 },
              { label: 'Default currency 3', value: 3 }
            ],
            isSearchable: true
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
    []
  );

  const renderInputs = useCallback((Component: (props: any) => JSX.Element, name: string, fieldType: string) => {
    return (
      <FastField name={name}>
        {({ field, meta, form }) => {
          return (
            <>
              <Component
                {...field}
                onChange={(evt) => {
                  form.setFieldValue(field.name, fieldType === 'input' ? evt.target.value : evt);
                  form.setFieldTouched(field.name, true);
                }}
                name={name}
                error={true}
                explanation={meta.touched && meta.error}
                color={meta.error && meta.touched ? 'danger' : ''}
              />
            </>
          );
        }}
      </FastField>
    );
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        providerCurrencies: '',
        defaultCurrency: '',
        targetMarkets: '',
        restrictedCountries: '',
        certifiedCountries: ''
      }}
      validationSchema={addProviderValidationSchema}
      onSubmit={() => console.log('submited')}
      validateOnBlur={false}
      validateOnChange={false}>
      <Form noValidate>
        <AtomForm renderInputs={renderInputs} {...atomFormProps} />
      </Form>
    </Formik>
  );
};

export default AddProviderContainer;

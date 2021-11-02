import { addProviderValidationSchema } from '@/validators/addProviderValidations';
// @ts-ignore
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useCallback, useMemo } from 'react';

type ProviderActions = {};

type ProviderContainerProps = {} & ProviderActions;

const AddProviderContainer: FC<ProviderContainerProps> = () => {
  const SelectComponent = useCallback((Component, name) => {
    return (
      <FastField name={name}>
        {({ field, meta }) => {
          console.log(meta, name, field);

          return (
            <>
              <Component
                {...field}
                name={name}
                error={true}
                explanation={meta.touched && meta.error}
                color={meta.error && meta.touched ? 'danger' : ''}
              />

              {/* <p>error - {meta.error}</p> */}
            </>
          );
        }}
      </FastField>
    );
  }, []);

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
          props: {
            inputLabel: 'Target market',
            options: [
              { label: 'market 1', value: 1 },
              { label: 'market 2', value: 2 },
              { label: 'market 3', value: 3 }
            ],
            isSearchable: true,
            isMulti: true
          }
        },
        {
          type: 'select',
          name: 'certifiedCountries',
          props: {
            inputLabel: 'Certified countries',
            options: [
              { label: 'Certified country 1', value: 1 },
              { label: 'Certified country 2', value: 2 },
              { label: 'Certified country 3', value: 3 }
            ],
            isSearchable: true,
            isMulti: true
          }
        },
        {
          type: 'select',
          name: 'certifiedCountries',
          props: {
            inputLabel: 'Restricted countries',
            options: [
              { label: 'Restricted country 1', value: 1 },
              { label: 'Restricted country 2', value: 2 },
              { label: 'Restricted country 3', value: 3 }
            ],
            isSearchable: true,
            isMulti: true
          }
        },
        {
          type: 'select',
          name: 'providerCurrencies',
          props: {
            inputLabel: 'Currency',
            options: [
              { label: 'Currency 1', value: 1 },
              { label: 'Currency 2', value: 2 },
              { label: 'Currency 3', value: 3 }
            ],
            isSearchable: true,
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

  return (
    <Formik
      initialValues={{
        name: '',
        providerCurrencies: '',
        defaultCurrency: '',
        targetMarkets: '',
        restrictedCountries: ''
      }}
      validationSchema={addProviderValidationSchema}
      onSubmit={() => console.log('submited')}
      validateOnBlur={false}
      validateOnChange={false}>
      <Form noValidate>
        {/* <CountriesSelect /> */}
        <AtomForm renderInputs={SelectComponent} {...atomFormProps} />
      </Form>
    </Formik>
  );
};

export default AddProviderContainer;

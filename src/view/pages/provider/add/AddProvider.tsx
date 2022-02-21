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
        type: 'select' as const,
        name: 'aggregator',
        component: (props: CustomSelectProps) => (
          <CountriesSelect {...props} isMulti fullWidth inputLabel={t.get('aggregator')} />
        )
      },
      {
        type: 'input' as const,
        name: 'providerName',
        label: t.get('providerName'),
        props: {
          optional: true,
          optionalText: t.get('optional')
        }
      },

      {
        type: 'input' as const,
        name: 'absoluteDemoURL',
        label: t.get('absoluteDemoURL')
      },
      {
        type: 'input' as const,
        name: 'absoluteRealURL',
        label: t.get('absoluteRealURL')
      }
    ],
    [selectedProviderCurrencies, t]
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

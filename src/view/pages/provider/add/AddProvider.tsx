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
          <CountriesSelect {...props} fullWidth inputLabel={t.get('aggregator')} />
        )
      },
      {
        type: 'input' as const,
        name: 'absoluteDemoUrl',
        label: t.get('absoluteDemoURL'),
        props: {
          optional: true,
          optionalText: 'asdsad',
          text: t.get('companyLogoType')
        }
      },
      {
        type: 'input' as const,
        name: 'providerName',
        label: t.get('providerNames'),
        props: {
          optional: true,
          optionalText: t.get('optional')
        }
      },
      {
        type: 'input' as const,
        name: 'absoluteRealUrl',
        label: t.get('absoluteRealURL'),
        props: {
          optional: true,
          optionalText: t.get('optional')
        }
      },
      {
        type: 'input' as const,
        name: 'externalId',
        label: t.get('externalId')
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
        onClick: () => historyService.redirectToURL(ROUTES.baseUrl + ROUTES.providers + ROUTES.providersList)
      }
    }),
    [t]
  );

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(form) => {
        console.log(form);

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

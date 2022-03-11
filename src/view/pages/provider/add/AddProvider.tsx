import { ROUTES } from '@/view/constants';
import { AddProviderViewModel } from '@/view/models';
import { createRenderInputs, CustomForm, historyService, useTranslation } from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { AtomPartnerProvider, BrandNameSelect, BusinessActivities } from '@atom/partner-management';
import { FastField, Form, FormikHelpers, useFormikContext } from 'formik';
import { FC, useMemo, useRef } from 'react';
import { SchemaOf } from 'yup';
import { initialValues } from './initialValues';
import ProvidersFormContainer from './ProvidersFormContainer';

export interface AddProviderProps {
  onSubmit: (data: AddProviderViewModel, form: FormikHelpers<typeof initialValues>) => void;

  validationSchema: SchemaOf<AddProviderViewModel> | null;
}

const AddProvider: FC<AddProviderProps> = ({ onSubmit, validationSchema }) => {
  const selectedAggregatorName = useRef<string>(null);

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
                businessActivityId={BusinessActivities.GAME_AGGREGATOR}
              />
            </AtomPartnerProvider>
          );
        }
      },
      {
        type: 'custom' as const,
        component: () => null,
        name: ''
      },
      {
        type: 'input' as const,
        name: 'absoluteDemoUrl',
        label: t.get('absoluteDemoURL'),
        props: {
          optionalText: t.get('optional')
        }
      },
      {
        type: 'input' as const,
        name: 'absoluteRealUrl',
        label: t.get('absoluteRealURL'),
        props: {
          optionalText: t.get('optional')
        }
      },
      {
        type: 'custom' as const,
        col: 12,
        name: 'providers' as keyof AddProviderViewModel,
        component: ProvidersFormContainer
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
    <CustomForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, formikHelpers) => {
        if (!data.providers.length) return;

        onSubmit({ ...data, partnerName: selectedAggregatorName.current }, formikHelpers);
      }}>
      {() => (
        <Form noValidate className='min-height-content-wrapper'>
          <AtomForm renderInputs={renderInputs} fields={atomFormFields} {...atomFormProps} />
        </Form>
      )}
    </CustomForm>
  );
};

export default AddProvider;

import { getAddProviderFormsValidationSchema } from '@/domain/validators';
import { useAsync, useValidationTranslation } from '@atom/common';
import { FastField, FieldProps, Formik } from 'formik';
import ProvidersForm from './ProvidersForm';
import { providersFormInitialValues } from './providersFormInitialValues';

const ProvidersFormContainer = () => {
  const t = useValidationTranslation();

  const validationSchema = useAsync(() => getAddProviderFormsValidationSchema(t), [t], null);

  return (
    <FastField name='providers'>
      {({ form }: FieldProps) => (
        <Formik initialValues={providersFormInitialValues} onSubmit={() => null} validationSchema={validationSchema}>
          <ProvidersForm
            onChange={(values) => form.setFieldValue('providers', values)}
            explanation={form.touched.providers && form.errors.providers?.toString()}
            isAddProviderFormSubmitting={form.isSubmitting}
            shouldTriggerFormSubmitting={!form.values.providers.length}
          />
        </Formik>
      )}
    </FastField>
  );
};

export default ProvidersFormContainer;

import { useTranslation } from '@atom/common';
import { AddProviderNameId, AddProviderNameIdValueType } from '@atom/design-system';
import { useFormikContext } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { ProviderFormValues } from '.';

export interface ProvidersFormProps {
  explanation?: string;
  onChange: (value: AddProviderNameIdValueType[], isAdded?: boolean) => void;
  isAddProviderFormSubmitting?: boolean;
  shouldTriggerFormSubmitting?: boolean;
}

const ProvidersForm = (props: ProvidersFormProps) => {
  const form = useFormikContext<ProviderFormValues>();

  const [explanation, setExplanation] = useState<string>(props.explanation);

  const t = useTranslation();

  const onInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await form.handleChange(e);
      form.handleBlur(e);

      setExplanation('');
    },
    [form]
  );

  useEffect(() => {
    if (props.shouldTriggerFormSubmitting && props.isAddProviderFormSubmitting) form.submitForm();
  }, [props.isAddProviderFormSubmitting]);

  useEffect(() => {
    setExplanation(props.explanation);
  }, [props.explanation, props.isAddProviderFormSubmitting]);

  return (
    <AddProviderNameId
      {...props}
      explanation={explanation}
      onChange={(...args) => {
        props.onChange(...args);

        form.resetForm();
      }}
      fromToProps={{
        fromInputProps: {
          label: t.get('providerName'),
          onChange: onInputChange,
          name: 'providerName' as keyof ProviderFormValues,
          id: 'providerName' as keyof ProviderFormValues,
          explanation: form.touched.providerName && form.errors.providerName,
          color: form.touched.providerName && form.errors.providerName ? 'danger' : undefined,
          value: form.values.providerName
        },
        toInputProps: {
          label: t.get('providerExternalId'),
          onChange: onInputChange,
          name: 'providerExternalId' as keyof ProviderFormValues,
          id: 'providerExternalId' as keyof ProviderFormValues,
          explanation: form.touched.providerExternalId && form.errors.providerExternalId,
          color: form.touched.providerExternalId && form.errors.providerExternalId ? 'danger' : undefined,
          value: form.values.providerExternalId
        }
      }}
      tooltipTitle={t.get('addProvider')}
      invalidTooltipTitle={t.get('pleaseFillFields')}
      fillProviderTooltipTitle={t.get('pleaseAddProvider')}
    />
  );
};

export default ProvidersForm;

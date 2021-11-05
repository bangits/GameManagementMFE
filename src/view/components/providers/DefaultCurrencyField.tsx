import { CustomSelect } from '@atom/common';
import { Field } from 'formik';

export interface DefaultCurrencyFieldProps {
  name: string;
}

export const DefaultCurrencyField = ({ name }: DefaultCurrencyFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta, form }) => {
        console.log(meta, name, field, form);
        console.log(form.values.certifiedCountries);

        return (
          <>
            <CustomSelect
              {...field}
              name={name}
              error={true}
              explanation={meta.touched && meta.error}
              color={meta.error && meta.touched ? 'danger' : ''}
              onChange={console.log}
            />
          </>
        );
      }}
    </Field>
  );
};

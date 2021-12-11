import { GameClassSelect, GameTypesSelect, GameVolatilitiesSelect, ProviderSelect } from '@/view';
import { ROUTES } from '@/view/constants';
import { AddGameViewModel, HasDemoEnum } from '@/view/models';
import { createRenderInputs, CustomSelectProps, redirectToURL, useTranslation } from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useMemo, useState } from 'react';
import { SchemaOf } from 'yup';
import { initialValues } from './initialValues';
export interface AddGameProps {
  onSubmit: (data: typeof initialValues) => void;
  validationSchema: SchemaOf<AddGameViewModel> | null;
}
const AddGame: FC<AddGameProps> = ({ onSubmit, validationSchema }) => {
  const t = useTranslation();
  const [date, setDate] = useState<Date | null>(null);

  const atomFormFields = useMemo(
    () => [
      {
        type: 'select' as const,
        name: 'providerId',
        component: (props: CustomSelectProps) => <ProviderSelect {...props} fullWidth inputLabel={t.get('provider')} />
      },
      {
        name: 'externalId',
        type: 'input' as const,
        label: t.get('externalId'),
        props: {
          type: 'number'
        }
      },
      {
        name: 'name',
        type: 'input' as const,
        label: t.get('gameName')
      },
      {
        name: 'subTypeId' as const,
        type: 'select' as const,
        component: (props: CustomSelectProps) => <GameTypesSelect {...props} fullWidth inputLabel={t.get('subType')} />
      },
      {
        type: 'select' as const,
        name: 'subTypeId',
        component: (props: CustomSelectProps) => <GameTypesSelect {...props} fullWidth inputLabel={t.get('type')} />
      },
      {
        type: 'datepicker' as const,
        name: 'releaseDate',
        label: t.get('releaseDate'),

        props: {
          onChange: (date: Date) => setDate(date),
          placeholderText: 'dd/mm/yyyy',
          dateFormat: 'dd/MM/yyyy',
          selected: date || new Date()
        }
      },
      {
        name: 'rtp',
        type: 'input' as const,
        label: t.get('rtp') + '%'
      },
      {
        name: 'volatility',
        type: 'select' as const,
        label: t.get('volatility'),
        component: ({ onChange }) => (
          <GameVolatilitiesSelect
            isMulti
            inputLabel={t.get('volatility')}
            fullWidth
            onChange={(changedValue) => onChange('volatility', changedValue)}
          />
        )
      },
      {
        name: 'class',
        type: 'select' as const,
        component: ({ onChange }) => (
          <GameClassSelect
            inputLabel={t.get('class')}
            fullWidth
            onChange={(changedValue) => onChange('class', changedValue)}
          />
        )
      },
      {
        name: 'hasDemo',
        type: 'select' as const,
        props: {
          selectAll: true,
          inputLabel: t.get('hasDemo'),
          selectAllLabel: t.get('all'),
          options: [
            { label: t.get('yes'), value: HasDemoEnum.YES },
            { label: t.get('no'), value: HasDemoEnum.NO }
          ],
          isSearchable: true,
          isMulti: true
        }
      }
    ],
    [t]
  );

  const atomFormProps = useMemo(
    () => ({
      title: t.get('addGame'),
      secondButtonProps: {
        children: t.get('save')
      },
      firstButtonProps: {
        children: t.get('close'),
        type: 'button' as const,
        onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.gamesList)
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

export default AddGame;

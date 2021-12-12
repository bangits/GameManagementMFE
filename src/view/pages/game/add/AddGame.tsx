import { GameClassSelect, GameTypesSelect, GameVolatilitiesSelect, ProviderSelect } from '@/view';
import { GAME_MIN_RELEASE_DATE, ROUTES } from '@/view/constants';
import { AddGameViewModel } from '@/view/models';
import { createRenderInputs, CustomSelectProps, redirectToURL, useTranslation } from '@atom/common';
import { Form as AtomForm } from '@atom/design-system';
import { FastField, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { FC, useMemo } from 'react';
import { SchemaOf } from 'yup';
import { initialValues } from './initialValues';
export interface AddGameProps {
  onSubmit: (data: AddGameViewModel, form: FormikHelpers<typeof initialValues>) => void;
  validationSchema: SchemaOf<AddGameViewModel> | null;
}

const AddGame: FC<AddGameProps> = ({ onSubmit, validationSchema }) => {
  const t = useTranslation();

  const atomFormFields = useMemo(
    () => [
      {
        type: 'select' as const,
        name: 'providerId' as keyof AddGameViewModel,
        label: t.get('games.add.fields.provider'),
        component: (props: CustomSelectProps) => (
          <ProviderSelect {...props} isMain fullWidth inputLabel={t.get('games.add.fields.provider')} />
        )
      },
      {
        name: 'externalId' as keyof AddGameViewModel,
        type: 'input' as const,
        label: t.get('games.add.fields.externalId'),
        props: {
          type: 'number'
        }
      },
      {
        name: 'name' as keyof AddGameViewModel,
        type: 'input' as const,
        label: t.get('games.add.fields.gameName')
      },
      {
        type: 'datepicker' as const,
        name: 'releaseDate' as keyof AddGameViewModel,
        label: t.get('games.list.fields.releaseDate'),
        props: {
          minDate: new Date(GAME_MIN_RELEASE_DATE)
        }
      },
      {
        name: 'typeId' as keyof AddGameViewModel,
        type: 'select' as const,
        inputLabel: t.get('games.list.fields.gameTypes'),
        component: (props: CustomSelectProps) => {
          const form = useFormikContext<AddGameViewModel>();

          return (
            <GameTypesSelect
              {...props}
              fullWidth
              inputLabel={t.get('games.list.fields.type')}
              onChange={(value, event) => {
                props.onChange(value, event);
                form.setFieldValue('subTypeId', null);
              }}
            />
          );
        }
      },
      {
        type: 'select' as const,
        name: 'subTypeId' as keyof AddGameViewModel,
        component: (props: CustomSelectProps) => {
          const form = useFormikContext<AddGameViewModel>();

          return (
            <GameTypesSelect
              {...props}
              fullWidth
              isDisabled={!form.values.typeId}
              gameTypeId={form.values.typeId}
              inputLabel={t.get('games.list.fields.subType')}
            />
          );
        }
      },

      {
        name: 'rtp' as keyof AddGameViewModel,
        type: 'input' as const,
        label: t.get('games.list.fields.rtp.title'),
        props: { type: 'number', isDecimal: true, maxLength: 7 }
      },
      {
        name: 'volatilityId' as keyof AddGameViewModel,
        type: 'select' as const,
        component: (props: CustomSelectProps) => <GameVolatilitiesSelect {...props} fullWidth />
      },
      {
        name: 'classId' as keyof AddGameViewModel,
        type: 'select' as const,
        component: (props: CustomSelectProps) => <GameClassSelect fullWidth {...props} />
      },
      {
        type: 'radio' as const,
        name: 'hasDemo' as keyof AddGameViewModel,
        label: t.get('games.list.fields.hasDemo.title'),
        props: {
          radios: [
            {
              label: t.get('games.list.fields.hasDemo.yes'),
              value: 1
            },
            {
              label: t.get('games.list.fields.hasDemo.no'),
              value: 0
            }
          ]
        }
      }
    ],
    [t]
  );

  const atomFormProps = useMemo(
    () => ({
      title: t.get('games.add.title'),
      secondButtonProps: {
        children: t.get('form.save')
      },
      firstButtonProps: {
        children: t.get('form.close'),
        type: 'button' as const,
        onClick: () => redirectToURL(ROUTES.baseUrl + ROUTES.gamesList)
      }
    }),
    [t]
  );

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, form) => onSubmit(data, form)}>
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

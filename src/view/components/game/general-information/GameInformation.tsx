import React, { FC, useMemo } from 'react';
import { FastField, Form, Formik } from 'formik';
import { FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import {
  createRenderInputs,
  CustomSelectProps,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import { GameTypesSelect, ProviderSelect, GameClassSelect } from '@/view';
import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';
import { getEditGameInfoInitialValues } from './initialValues';
import { editGameInfoValidations } from '@/domain/validators';

export interface GameInformationProps {
  data?: GamesDetailsViewModel;
  onSubmit?: (data: EditGameInformationViewModel) => void;
}

const GameInformation: FC<GameInformationProps> = ({ data, onSubmit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editedFormProps = useMemo<FlexibleFormProps['editedFormProps']>(
    () => ({
      options: [
        {
          title: 'Game Name',
          variant: 'default',
          value: 'Shining Crown'
        },
        {
          title: 'External ID',
          variant: 'bold',
          value: 'ID123456789454'
        },
        {
          title: 'Type',
          variant: 'default',
          value: 'Casino Games'
        },
        {
          title: 'Subtype',
          variant: 'default',
          value: 'Slots'
        },
        {
          title: 'Provider',
          variant: 'default',
          value: 'EGT'
        },
        {
          title: 'Release Date',
          variant: 'default',
          value: '09/12/1220'
        },
        {
          title: 'Class',
          variant: 'default',
          value: 'Branded'
        },
        {
          title: 'Has Demo',
          variant: 'default',
          value: 'Yes'
        }
      ]
    }),
    []
  );

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      fields: [
        {
          type: 'input',
          name: 'gameName',
          label: 'Game Name'
        },
        {
          type: 'input',
          name: 'externalId',
          label: 'External ID'
        },
        {
          type: 'select' as const,
          name: 'gameType',
          label: t.get(''),
          component: (props: CustomSelectProps) => {
            return <GameTypesSelect {...props} fullWidth inputLabel={t.get('')} />;
          }
        },
        {
          type: 'select' as const,
          name: 'subType',
          label: t.get('x'),
          component: (props: CustomSelectProps) => {
            return <GameTypesSelect {...props} fullWidth inputLabel={t.get('x')} />;
          }
        },
        {
          type: 'select' as const,
          name: 'subType',
          label: t.get('x'),
          component: (props: CustomSelectProps) => {
            return (
              <ProviderSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('1')}
              />
            );
          }
        },
        {
          type: 'datepicker' as const,
          name: 'companyRegistrationDate',
          label: t.get('registrationDate')
        },
        {
          type: 'select' as const,
          name: 'subType',
          label: t.get('x'),
          component: (props: CustomSelectProps) => {
            return (
              <GameClassSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('12')}
              />
            );
          }
        },
        {
          type: 'checkbox',
          name: 'hasDemo',
          label: 'Has Demo',
          props: {
            checkboxes: [
              {
                label: 'Yes',
                value: 1
              },
              {
                label: 'No',
                value: 2
              }
            ]
          }
        }
      ],
      renderInputs
    }),
    []
  );

  const editGameInformationValidationScheme = useAsync(
    () => editGameInfoValidations(translationValidations),
    [translationValidations],
    null
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={getEditGameInfoInitialValues(data)}
      validationSchema={editGameInformationValidationScheme}>
      {(form) => {
        return (
          <Form noValidate>
            <FlexibleForm title='Game Information' editedFormProps={editedFormProps} editFormProps={editFormProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default GameInformation;

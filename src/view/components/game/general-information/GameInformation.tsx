import { editGameInfoValidations } from '@/domain/validators';
import { GameClassSelect, GameTypesSelect, ProviderSelect } from '@/view';
import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';
import {
  convertDate,
  createRenderInputs,
  CustomSelectProps,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import { FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import { FastField, Form, Formik, useFormikContext } from 'formik';
import React, { FC, useMemo } from 'react';
import { getEditGameInfoInitialValues } from './initialValues';

export interface GameInformationProps {
  data: GamesDetailsViewModel;
  onSubmit: (data: EditGameInformationViewModel) => void;
  isEdit: boolean;
}

const GameInformation: FC<GameInformationProps> = ({ data, onSubmit, isEdit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editedFormProps = useMemo<FlexibleFormProps['editedFormProps']>(
    () => ({
      editButtonTooltipText: t.get('edit'),
      viewMoreLabel: t.get('viewMore'),
      viewLessLabel: t.get('viewLess'),
      options: [
        {
          title: t.get('gameName'),
          variant: 'default',
          value: data?.gameName
        },
        {
          title: t.get('externalId'),
          variant: 'bold',
          value: data?.externalId
        },
        {
          title: t.get('type'),
          variant: 'default',
          value: data.type?.name
        },
        {
          title: t.get('subType'),
          variant: 'default',
          value: data.subType?.name
        },
        {
          title: t.get('provider'),
          variant: 'default',
          value: data?.providerName
        },
        {
          title: t.get('releaseDate'),
          variant: 'default',
          value: data.releaseDate && convertDate(data.releaseDate, 'MM/DD/YYYY')
        },
        {
          title: t.get('class'),
          variant: 'default',
          value: data.className
        },
        {
          title: t.get('hasDemo'),
          variant: 'default',
          value: data?.hasDemo ? t.get('yes') : t.get('no')
        }
      ]
    }),
    [data, t]
  );

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      applyButtonTooltipText: t.get('apply'),
      closeButtonTooltipText: t.get('close'),
      fields: [
        {
          type: 'input',
          name: 'name',
          label: t.get('gameName')
        },
        {
          type: 'input',
          name: 'externalId',
          label: t.get('externalId')
        },
        {
          type: 'select' as const,
          name: 'gameTypeId',
          label: t.get('gameTypes'),
          component: (props: CustomSelectProps) => {
            const form = useFormikContext<EditGameInformationViewModel>();

            return (
              <GameTypesSelect
                {...props}
                fullWidth
                onChange={(value) => {
                  form.setFieldValue('gameTypeId', value);
                  form.setFieldTouched('gameTypeId', true);

                  form.setFieldValue('subTypeId', null);
                }}
                inputLabel={t.get('gameTypes')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'subTypeId',
          label: t.get('subType'),
          component: (props: CustomSelectProps) => {
            const form = useFormikContext<EditGameInformationViewModel>();

            return (
              <GameTypesSelect {...props} gameTypeId={form.values.gameTypeId} fullWidth inputLabel={t.get('subType')} />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'providerId',
          label: t.get('provider'),
          component: (props: CustomSelectProps) => {
            return <ProviderSelect {...props} fullWidth inputLabel={t.get('provider')} />;
          }
        },
        {
          type: 'datepicker' as const,
          name: 'releaseDate',
          label: t.get('registrationDate')
        },
        {
          type: 'select' as const,
          name: 'classId',
          label: t.get('class'),
          component: (props: CustomSelectProps) => {
            return <GameClassSelect {...props} fullWidth inputLabel={t.get('class')} />;
          }
        },
        {
          type: 'radio' as const,
          name: 'hasDemo',
          label: t.get('hasDemo'),
          props: {
            radios: [
              {
                label: t.get('yes'),
                value: 1,
                name: 'yes'
              },
              {
                label: t.get('no'),
                value: 0,
                name: 'no'
              }
            ]
          }
        }
      ],
      renderInputs
    }),
    [t]
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
            <FlexibleForm
              isEdit={isEdit}
              title={t.get('gameInformation')}
              onSubmit={async (onClose) => {
                await form.submitForm();

                const errors = await form.validateForm();

                if (!Object.values(errors).length) onClose();
              }}
              editedFormProps={editedFormProps}
              editFormProps={editFormProps}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default GameInformation;

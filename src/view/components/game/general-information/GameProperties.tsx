import { editGamePropertiesValidations } from '@/domain/validators/editGamePropertiesValidations';
import { GameFeaturesSelect, GameThemesSelect, GameVolatilitiesSelect } from '@/view';
import { EditGamePropertiesViewModel, GamesDetailsViewModel } from '@/view/models';
import {
  convertToDecimalNumberFixed2,
  createRenderInputs,
  CustomSelectProps,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import { FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import React, { FC, useMemo } from 'react';
import { getEditGamePropertiesValues } from './initialValues';

export interface GamePropertiesProps {
  data: GamesDetailsViewModel;
  onSubmit: (data: EditGamePropertiesViewModel) => void;
  isEdit: boolean;
}

const GameProperties: FC<GamePropertiesProps> = ({ data, onSubmit, isEdit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editedFormProps = useMemo<FlexibleFormProps['editedFormProps']>(
    () => ({
      options: [
        {
          title: t.get('feature'),
          variant: 'tag',
          value: data.gameFeatures.map((feature) => feature?.name)
        },
        {
          title: t.get('theme'),
          variant: 'tag',
          value: data.gameThemes.map((theme) => theme?.name)
        },
        {
          title: t.get('rtp'),
          variant: 'default',
          value: data.rtp
        },
        {
          title: t.get('volatility'),
          variant: 'default',
          value: data.volatilityName
        },
        {
          title: t.get('maxWin'),
          variant: 'default',
          value: data.maxWin && convertToDecimalNumberFixed2(data.maxWin)
        }
      ]
    }),
    [data, t]
  );

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      fields: [
        {
          type: 'select' as const,
          name: 'featureIds',
          label: t.get('gameFeatures'),
          component: (props: CustomSelectProps) => {
            return (
              <GameFeaturesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('gameFeatures')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'themesIds',
          label: t.get('gameThemes'),
          component: (props: CustomSelectProps) => {
            return (
              <GameThemesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('gameThemes')}
              />
            );
          }
        },
        {
          type: 'input' as const,
          name: 'rtp',
          label: t.get('rtp'),
          props: {
            type: 'number',
            isDecimal: true
          }
        },
        {
          type: 'select' as const,
          name: 'volatilityId',
          label: t.get('volatility'),
          component: (props: CustomSelectProps) => {
            return <GameVolatilitiesSelect {...props} fullWidth inputLabel={t.get('volatility')} />;
          }
        },
        {
          type: 'input',
          name: 'maxWin',
          label: 'Max Win',
          props: {
            type: 'number',
            isDecimal: true
          }
        }
      ],
      renderInputs
    }),
    [t]
  );

  const editGameInformationValidationScheme = useAsync(
    () => editGamePropertiesValidations(translationValidations),
    [translationValidations],
    null
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={getEditGamePropertiesValues(data)}
      validationSchema={editGameInformationValidationScheme}>
      {(form) => {
        return (
          <Form noValidate>
            <FlexibleForm
              isEdit={isEdit}
              noDataText={t.get('emptyValue')}
              title={t.get('gameProperties')}
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

export default GameProperties;

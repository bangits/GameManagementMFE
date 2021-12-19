import { createRenderInputs, CustomSelectProps, LanguageSelect, useTranslation } from '@atom/common';
import { FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import React, { FC, useMemo } from 'react';
import { GameVolatilitiesSelect, GameThemesSelect, GameFeaturesSelect } from '@/view';
import { GamesDetailsViewModel } from '@/view/models';

export interface GamePropertiesProps {
  data: GamesDetailsViewModel;
}

const GameProperties: FC<GamePropertiesProps> = ({ data }) => {
  const t = useTranslation();

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
          value: data.maxWin
        }
      ]
    }),
    []
  );

  const editFormProps = useMemo<FlexibleFormProps['editFormProps']>(
    () => ({
      fields: [
        {
          type: 'select' as const,
          name: 'uiLanguages',
          label: t.get('uiLanguages'),
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
                inputLabel={t.get('uiLanguages')}
              />
            );
          }
        },
        {
          type: 'select' as const,
          name: 'operatingLanguages',
          label: t.get('operatingLanguages'),
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
                inputLabel={t.get('operatingLanguages')}
              />
            );
          }
        },
        {
          type: 'input' as const,
          name: 'rtp',
          label: t.get('rtp')
        },
        {
          type: 'select' as const,
          name: 'restrictedCountries',
          label: t.get('restrictedCountries'),
          component: (props: CustomSelectProps) => {
            return (
              <GameVolatilitiesSelect
                {...props}
                isMulti
                selectAll
                selectAllLabel={t.get('all')}
                clearButton
                clearButtonLabel={t.get('clear')}
                fullWidth
                inputLabel={t.get('restrictedCountries')}
              />
            );
          }
        },
        {
          type: 'input',
          name: 'maxWin',
          label: 'Max Win'
        }
      ],
      renderInputs
    }),
    []
  );

  return (
    /* @ts-expect-error excepting onSubmit error */
    <Formik onSubmit={() => console.log} initialValues={{}} validationSchema={{}}>
      {(form) => {
        return (
          <Form noValidate>
            <FlexibleForm
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

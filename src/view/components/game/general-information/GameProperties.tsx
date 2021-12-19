import { createRenderInputs, CustomSelectProps, LanguageSelect, useTranslation } from '@atom/common';
import { FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { GameVolatilitiesSelect, GameThemesSelect, GameFeaturesSelect } from '@/view';

const GameProperties = () => {
  const t = useTranslation();

  const renderInputs = useMemo(() => createRenderInputs(FastField), []);

  const editedFormProps = useMemo<FlexibleFormProps['editedFormProps']>(
    () => ({
      options: [
        {
          title: 'Feature',
          variant: 'tag',
          value: ['Jackpot Support', 'FreeSpin Support']
        },
        {
          title: 'Theme',
          variant: 'tag',
          value: ['Jewels and Gems', 'Fantasy', 'Halloween', 'Luxury']
        },
        {
          title: 'RTP',
          variant: 'default',
          value: '98.7%'
        },
        {
          title: 'Volatility',
          variant: 'default',
          value: 'Low-Medium'
        },
        {
          title: 'Max Win',
          variant: 'default',
          value: 'x 2000'
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
            <FlexibleForm title='Game Properties' editedFormProps={editedFormProps} editFormProps={editFormProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default GameProperties;

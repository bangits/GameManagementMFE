import { editGameInfoValidations } from '@/domain/validators';
import { GameClassSelect, GameTypesSelect, ProviderSelect } from '@/view';
import { EditGameInformationViewModel, GamesDetailsViewModel } from '@/view/models';
import { AuthenticatedContext } from '@atom/authorization';
import {
  CustomForm,
  CustomSelectProps,
  convertDate,
  createRenderInputs,
  historyService,
  useAsync,
  useTranslation,
  useValidationTranslation
} from '@atom/common';
import { CheckboxWithLabel, FlexibleForm, FlexibleFormProps } from '@atom/design-system';
import { FastField, Form, useFormikContext } from 'formik';
import { FC, useContext, useMemo } from 'react';
import { getEditGameInfoInitialValues } from './initialValues';

export interface GameInformationProps {
  data: GamesDetailsViewModel;
  onSubmit: (data: EditGameInformationViewModel) => void;
  isEdit: boolean;
}

const GameInformation: FC<GameInformationProps> = ({ data, onSubmit, isEdit }) => {
  const t = useTranslation();

  const translationValidations = useValidationTranslation();

  const { user } = useContext(AuthenticatedContext);

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
        },
        {
          title: t.get('freeSpinApiSupport'),
          variant: 'default',
          value: data?.hasFreeSpin ? t.get('yes') : t.get('no')
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
          label: t.get('releaseDate')
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
          type: 'custom' as const,
          name: 'hasDemo',
          labelPositionRelative: true,
          labelText: t.get('hasDemo'),
          col: 2,
          component: () => {
            const form = useFormikContext<EditGameInformationViewModel>();

            return (
              <CheckboxWithLabel
                className='mt-2'
                checked={form.values.hasDemo}
                variant='switch'
                label={t.get('yes')}
                onChange={(e) => form.setFieldValue('hasDemo', e.target.checked)}
                startLabel={t.get('no')}
              />
            );
          }
        },
        {
          type: 'custom' as const,
          name: 'hasFreeSpin',
          labelPositionRelative: true,
          labelText: t.get('freeSpinApiSupport'),
          col: 2,
          component: () => {
            const form = useFormikContext<EditGameInformationViewModel>();

            return (
              <CheckboxWithLabel
                className='mt-2'
                checked={form.values.hasFreeSpin}
                variant='switch'
                label={t.get('yes')}
                onChange={(e) => form.setFieldValue('hasFreeSpin', e.target.checked)}
                startLabel={t.get('no')}
              />
            );
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

  const initialValues = useMemo(() => getEditGameInfoInitialValues(data), [data]);

  return (
    <CustomForm
      showKeepChangesModal
      onSubmit={(data, _, isValuesSameAsInitialValues) => {
        if (!isValuesSameAsInitialValues) onSubmit(data);
      }}
      initialValues={{
        ...initialValues,
        lastUpdatedUserEmail: user.email
      }}
      enableReinitialize
      validationSchema={editGameInformationValidationScheme}>
      {(form) => {
        return (
          <Form noValidate>
            <FlexibleForm
              isEdit={isEdit}
              title={t.get('gameInformation')}
              onClose={() => historyService.unblock()}
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
    </CustomForm>
  );
};

export default GameInformation;

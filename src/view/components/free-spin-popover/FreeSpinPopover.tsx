import { ActionResponseModel, useBulkActionAlert, useTranslation } from '@atom/common';
import {
  Button,
  ButtonForm,
  ButtonFormProps,
  IconButton,
  Icons,
  RadioGroup,
  RadioGroupProps,
  Tooltip,
  Typography,
  alert
} from '@atom/design-system';
import { FC, useCallback, useMemo, useState } from 'react';

export interface FreeSpinPopoverProps {
  onSubmit(hasFreeSpin: boolean): Promise<ActionResponseModel>;
}

export const FreeSpinPopover: FC<FreeSpinPopoverProps> = ({ onSubmit }) => {
  const t = useTranslation();

  const bulkActionAlert = useBulkActionAlert();

  const [hasFreeSpin, setHasFreeSpin] = useState<boolean | null>(null);

  const renderOpenElement = useCallback<ButtonFormProps['renderOpenElement']>(
    ({ open }) => (
      <Tooltip text={t.get('freeSpinApiSupport')}>
        <IconButton icon={<Icons.APIIcon />} onClick={open} />
      </Tooltip>
    ),
    [t]
  );

  const buttonFormStyles = useMemo<ButtonFormProps['style']>(
    () => ({
      minWidth: '19.3rem'
    }),
    []
  );

  const radios = useMemo<RadioGroupProps['radios']>(
    () => [
      {
        label: t.get('yes'),
        value: 'true'
      },
      {
        label: t.get('no'),
        value: 'false'
      }
    ],
    [t]
  );

  const onRadioGroupChange = useCallback<RadioGroupProps['onChange']>(
    (e) => setHasFreeSpin(e.target.value === 'true'),
    []
  );

  const createOnSaveHandler = useCallback(
    (closeBtnForm: () => void) => () => {
      closeBtnForm();

      onSubmit(hasFreeSpin)
        .then(bulkActionAlert)
        .catch(() =>
          alert.error({
            alertLabel: t.get('errorAlertMessage')
          })
        );
    },
    [bulkActionAlert, t, hasFreeSpin]
  );

  return (
    <ButtonForm style={buttonFormStyles} renderOpenElement={renderOpenElement}>
      {({ close }) => (
        <>
          <Typography className='form-color' variant='p4'>
            {t.get('isFreeSpinApiSupport')} ?
          </Typography>

          <RadioGroup variant='vertical' onChange={onRadioGroupChange} value={String(hasFreeSpin)} radios={radios} />

          <Button
            onClick={createOnSaveHandler(close)}
            disabled={hasFreeSpin === null}
            className='ml-auto'
            variant='link'>
            {t.get('save')}
          </Button>
        </>
      )}
    </ButtonForm>
  );
};

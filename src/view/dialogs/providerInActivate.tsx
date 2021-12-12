import { UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';

export interface ProviderInActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: { providerName: string } | { providerName: string }[];
}

export const showProviderInActivateDialog = ({ t, onSubmit, column }: ProviderInActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('inActivate'),
    description: (
      <>
        {t.get('providerInActivateDescirptionFirstPart')}
        <strong>{Array.isArray(column) ? column.length : <>"{column.providerName}""</>}</strong>

        {Array.isArray(column)
          ? t.get('multipleProviderInActivateDescirptionLastPart')
          : t.get('providerInActivateDescirptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('cancel'),
    submitButtonText: t.get('inActivate'),
    icon: <Icons.BlockPopupIcon />,
    onSubmit
  });
};

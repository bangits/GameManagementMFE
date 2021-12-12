import { UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';

export interface ProviderActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: { providerName: string } | { providerName: string }[];
}

export const showProviderActivateDialog = ({ t, onSubmit, column }: ProviderActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('approve'),
    description: (
      <>
        {t.get('providerActivateDescirptionFirstPart')}
        <strong>{Array.isArray(column) ? column.length : <>"{column.providerName}"</>}</strong>

        {Array.isArray(column)
          ? t.get('multipleProviderActivateDescirptionLastPart')
          : t.get('providerActivateDescirptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('cancel'),
    submitButtonText: t.get('approve'),
    icon: <Icons.CheckPopupIcon />,
    onSubmit
  });
};

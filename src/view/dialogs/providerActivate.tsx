import { PrimaryKey, UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';

export interface ProviderActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: { providerId: PrimaryKey } | { providerId: PrimaryKey }[];
}

export const showProviderActivateDialog = ({ t, onSubmit, column }: ProviderActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('partners.dialogs.approve.title'),
    description: (
      <>
        {t.get('partners.dialogs.approve.descirptionFirstPart')}
        <strong>
          {Array.isArray(column) ? (
            column.length
          ) : (
            <>
              Activate provider
              {/* "{t.get('common.id')}: {column.partnerId} {column.legalName} {column.legalEntity}" */}
            </>
          )}
        </strong>
        {t.get('partners.dialogs.approve.descirptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('form.cancel'),
    submitButtonText: t.get('partners.dialogs.approve.submitButton'),
    icon: <Icons.CheckPopupIcon />,
    onSubmit
  });
};

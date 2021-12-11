import { PrimaryKey, UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';

export interface ProviderActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: { providerId: PrimaryKey } | { providerId: PrimaryKey }[];
}

export const showProviderActivateDialog = ({ t, onSubmit, column }: ProviderActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('approve'),
    description: (
      <>
        {t.get('partnerApproveDescirptionFirstPart')}
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
        {t.get('partnerApproveDescirptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('cancel'),
    submitButtonText: t.get('approve'),
    icon: <Icons.CheckPopupIcon />,
    onSubmit
  });
};

import { UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';
import { GameActionsViewModel } from '../models';

export interface GameActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: GameActionsViewModel | GameActionsViewModel[];
}

export const showGameActivateDialog = ({ t, onSubmit, column }: GameActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('activate'),
    description: (
      <>
        {t.get('gameActivateDescriptionFirstPart')}
        <strong>{Array.isArray(column) ? column.length : <>"{column.name}"</>}</strong>

        {Array.isArray(column)
          ? t.get('multipleGameActivateDescriptionLastPart')
          : t.get('gameActivateDescriptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('cancel'),
    submitButtonText: t.get('activate'),
    icon: <Icons.CheckPopupIcon />,
    onSubmit
  });
};

import { UseTranslationReturnValue } from '@atom/common';
import { dialog, Icons } from '@atom/design-system';
import { GameActionsViewModel } from '../models';

export interface GameInActivateDialogProperties {
  t: UseTranslationReturnValue;
  onSubmit: (cancelFn: () => void) => void;
  column: GameActionsViewModel | GameActionsViewModel[];
}

export const showGameInActivateDialog = ({ t, onSubmit, column }: GameInActivateDialogProperties) => {
  dialog.acceptionDialog({
    title: t.get('inActivate'),
    description: (
      <>
        {t.get('gameInActivateDescriptionFirstPart')}
        <strong>{Array.isArray(column) ? column.length : <>"{column.name}"</>}</strong>

        {Array.isArray(column)
          ? t.get('multipleGameInActivateDescriptionLastPart')
          : t.get('gameInActivateDescriptionLastPart')}
      </>
    ),
    cancelButtonText: t.get('cancel'),
    submitButtonText: t.get('inActivate'),
    icon: <Icons.BlockPopupIcon />,
    onSubmit
  });
};

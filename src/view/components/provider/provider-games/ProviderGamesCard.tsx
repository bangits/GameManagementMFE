import { useMemo } from 'react';
import { gameStatusesConfig } from '@/view/configs';
import { CMSLabelReduxProvider, LabelManagerProps, LabelManagerTag } from '@atom/cms-label-management';
import { PrimaryKey, useTranslation } from '@atom/common';
import { ItemCategoriesCard, ItemCategoriesCardProps } from '@atom/design-system';
import { ProviderGameViewModel } from '@/atom-game-management';

export interface ProviderGameCardProps {
  data: ProviderGameViewModel;
  providerName: string;
  onGameDetailsClick: () => void;
  onGameClick: (gameId: PrimaryKey, isDemo: boolean) => void;
}

export const ProviderGamesCard = ({ data, providerName, onGameDetailsClick, onGameClick }: ProviderGameCardProps) => {
  const t = useTranslation();

  const translations = useMemo<ItemCategoriesCardProps<LabelManagerProps>['translations']>(
    () => ({
      view: t.get('view'),
      playDemoText: t.get('playDemo')
    }),
    [t]
  );

  return (
    <CMSLabelReduxProvider>
      <ItemCategoriesCard
        showActions
        labelComponent={LabelManagerTag}
        key={data.id}
        imgSrc={data.backGroundImage}
        name={data.name}
        subTitle={providerName}
        onPlayButtonClick={() => onGameClick(data.id, false)}
        onDemoPlayButtonClick={() => onGameClick(data.id, true)}
        onViewButtonClick={onGameDetailsClick}
        translations={translations}
      />
    </CMSLabelReduxProvider>
  );
};

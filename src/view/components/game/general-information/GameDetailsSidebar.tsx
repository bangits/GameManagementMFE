import { useMemo } from 'react';
import { PrimaryKey, useTranslation } from '@atom/common';
import { Button, ButtonProps, NameDescription, ProfileBlock, StatusView, StatusViewProps } from '@atom/design-system';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';

export interface GameDetailsSidebarProps {
  buttons: {
    playButtonProps: ButtonProps;
    playDemoButtonProps: ButtonProps;
  };
  backgroundImgUrl: string;
  gameId: PrimaryKey;
  gameName: string;
  mainImgUrl: string;
  creationDate: string;
  createdBy: string;
  lastUpdateDate: string;
  lastUpdateBy: string;
  statusInfo: Omit<StatusViewProps, 'label'>;
  refetch: () => void;
  onBackgroundImgClick: () => void;
  onMainImgClick: () => void;
}
export const GameDetailsSidebar = ({
  buttons,
  statusInfo,
  backgroundImgUrl,
  gameId,
  gameName,
  mainImgUrl,
  onBackgroundImgClick,
  onMainImgClick,
  creationDate,
  createdBy,
  lastUpdateBy,
  lastUpdateDate
}: GameDetailsSidebarProps) => {
  const t = useTranslation();

  const nameDescriptionData = useMemo(
    () => [
      {
        name: t.get('creationDate'),
        description: creationDate
      },
      {
        name: t.get('createdBy'),
        description: createdBy
      },
      {
        name: t.get('lastUpdateDate'),
        description: lastUpdateDate
      },
      {
        name: t.get('lastUpdateBy'),
        description: lastUpdateBy
      }
    ],
    [t, creationDate, createdBy, lastUpdateDate, lastUpdateBy]
  );

  return (
    <div className={css({ width: '23rem' })}>
      <ProfileBlock
        backgroundImgUrl={backgroundImgUrl}
        itemId={`${t.get('id')} ${gameId || t.get('emptyValue')}`}
        itemName={gameName}
        mainImgUrl={mainImgUrl}
        onBackgroundImgClick={onBackgroundImgClick}
        onMainImgClick={onMainImgClick}
      />

      <div className={css({ marginBottom: '1rem' })}>
        <StatusView {...statusInfo} label={t.get('status')} />
      </div>

      <NameDescription data={nameDescriptionData} noDataText={t.get('emptyValue')} />

      <div className={hstack({ gap: 0, justifyContent: 'space-between', mt: '1rem' })}>
        <Button {...buttons.playDemoButtonProps} variant='ghost'>
          {t.get('playDemo')}
        </Button>
        <Button {...buttons.playButtonProps}>{t.get('play')}</Button>
      </div>
    </div>
  );
};

import { GameGeneralInformationContainer } from '@/view';
import { gameStatusesConfig } from '@/view/configs';
import { GamesDetailsViewModel } from '@/view/models';
import { convertDate, redirectToURL, useTranslation } from '@atom/common';
import {
  GameDetails as GameDetailsPage,
  GameDetailsProps as GameDetailsPageProps,
  PageWrapper
} from '@atom/design-system';
import { FC, useMemo } from 'react';

export interface GameDetailsProps {
  data: GamesDetailsViewModel;
  // actions
  shouldShowActivateButton: boolean;
  shouldShowInActivateButton: boolean;
  onInActivateButtonClick: () => void;
  onActivateButtonClick: () => void;
}

const GameDetails: FC<GameDetailsProps> = ({
  data,
  shouldShowActivateButton,
  shouldShowInActivateButton,
  onActivateButtonClick,
  onInActivateButtonClick
}) => {
  const t = useTranslation();

  const breadCrumbs = useMemo(
    () => [
      {
        label: t.get('gameManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => redirectToURL('/game')
        }
      },
      {
        label: t.get('gameDetails')
      }
    ],
    [t]
  );

  const statusInfo = useMemo(
    () => ({
      statusLabel: t.get(gameStatusesConfig[data.statusId].translationKey),
      variant: gameStatusesConfig[data.statusId].variant,
      actions: [
        ...(shouldShowActivateButton
          ? [
              {
                iconName: 'CheckButtonIcon' as const,
                onClick: onActivateButtonClick,
                tooltipText: t.get('activate')
              }
            ]
          : []),
        ...(shouldShowInActivateButton
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: onInActivateButtonClick,
                tooltipText: t.get('inActivate')
              }
            ]
          : [])
      ]
    }),
    [shouldShowInActivateButton, onActivateButtonClick, shouldShowActivateButton, onInActivateButtonClick, t]
  );

  const translations = useMemo<GameDetailsPageProps['translations']>(
    () => ({
      createdBy: t.get('createdBy'),
      creationDate: t.get('creationDate'),
      status: t.get('status'),
      lastUpdateDate: t.get('lastUpdateDate'),
      lastUpdateBy: t.get('lastUpdateBy'),
      generalInformation: t.get('generalInformation'),
      assets: t.get('assets'),
      playButton: t.get('play'),
      playDemoButton: t.get('playDemo')
    }),
    [t]
  );

  return (
    <PageWrapper>
      <GameDetailsPage
        gameName={data.gameName}
        gameId={`${t.get('id')} ${data.gameId ? data.gameId : t.get('emptyValue')}`}
        breadCrumbs={breadCrumbs}
        noDataText={t.get('emptyValue')}
        statusInfo={statusInfo}
        creationDate={convertDate(data.creationDate)}
        createdBy={data.createdByUserEmail}
        lastUpdateDate={convertDate(data.lastUpdatedDate)}
        lastUpdateBy={data.lastUpdatedByUserEmail}
        generalInformationContext={<GameGeneralInformationContainer data={data} />}
        buttons={{
          playButtonProps: {},
          playDemoButtonProps: {
            disabled: !data.hasDemo
          }
        }}
        translations={translations}
      />
    </PageWrapper>
  );
};

export default GameDetails;

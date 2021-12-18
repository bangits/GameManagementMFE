import { GameGeneralInformationContainer } from '@/view';
import { gameStatusesConfig } from '@/view/configs';
import { GamesDetailsViewModel } from '@/view/models';
import { redirectToURL, useTranslation } from '@atom/common';
import {
  GameDetails as GameDetailsPage,
  GameDetailsProps as GameDetailsPageProps,
  PageWrapper
} from '@atom/design-system';
import { FC, useMemo } from 'react';

export interface GameDetailsProps {
  data: GamesDetailsViewModel;
  // actions
  shouldShowTerminateButton: boolean;
  shouldShowApproveButton: boolean;
  onTerminateButtonClick: () => void;
  onApproveButtonClick: () => void;
}

const GameDetails: FC<GameDetailsProps> = ({
  data,
  shouldShowTerminateButton,
  shouldShowApproveButton,
  onApproveButtonClick,
  onTerminateButtonClick
}) => {
  const t = useTranslation();

  const breadCrumbs = useMemo(
    () => [
      {
        label: t.get('gameManagement'),
        isRedirect: true,
        componentProps: {
          onClick: () => redirectToURL('/games')
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
      statusLabel: t.get(gameStatusesConfig[1].translationKey),
      variant: gameStatusesConfig[2].variant,
      actions: [
        ...(shouldShowApproveButton
          ? [
              {
                iconName: 'CheckButtonIcon' as const,
                onClick: onApproveButtonClick,
                tooltipText: t.get('approve')
              }
            ]
          : []),
        ...(shouldShowTerminateButton
          ? [
              {
                iconName: 'BlockButtonIcon' as const,
                onClick: onTerminateButtonClick,
                tooltipText: t.get('terminate')
              }
            ]
          : [])
      ]
    }),
    [shouldShowApproveButton, onApproveButtonClick, shouldShowTerminateButton, onTerminateButtonClick, t]
  );

  const translations = useMemo<GameDetailsPageProps['translations']>(
    () => ({
      createdBy: '',
      creationDate: '',
      status: t.get('status'),
      lastUpdateDate: '',
      lastUpdateBy: '',
      generalInformation: 'General Information',
      assets: '',
      playButton: 'Play',
      playDemoButton: 'Play Demo'
    }),
    [t]
  );

  return (
    <PageWrapper>
      <GameDetailsPage
        gameName=''
        gameId=''
        breadCrumbs={breadCrumbs}
        noDataText={t.get('emptyValue')}
        statusInfo={statusInfo}
        creationDate={''}
        createdBy=''
        lastUpdateDate=''
        lastUpdateBy=''
        generalInformationContext={<GameGeneralInformationContainer />}
        buttons={{
          playButtonProps: {},
          playDemoButtonProps: {}
        }}
        translations={translations}
      />
    </PageWrapper>
  );
};

export default GameDetails;

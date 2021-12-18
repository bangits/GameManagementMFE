import { gameStatusesConfig } from '@/view/configs';
import { GamesDetailsViewModel } from '@/view/models';
import { redirectToURL, useTranslation } from '@atom/common';
import { PageWrapper } from '@atom/design-system';
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

  const docInfo = useMemo(
    () => ({
      documentID: '5461213584',
      type: 'Gameship Agreement',
      expirationDate: '12/08/2021',
      statusLabel: 'Signed',
      statusVariant: 'active' as const
    }),
    []
  );

  const translations = useMemo(
    () => ({
      status: t.get('status'),
      parentCompany: t.get('parentCompany'),
      parentCompanyId: t.get('parentCompanyId'),
      expirationDate: t.get('expirationDate'),
      type: t.get('type'),
      documentID: t.get('documentId'),
      providerInformation: t.get('providerInformation'),
      mainInformation: t.get('mainInformation'),
      organizationData: t.get('organizationData')
    }),
    [t]
  );

  return (
    <PageWrapper>
      {/* <GameDetailsPage
        breadCrumbs={breadCrumbs}
        noDataText={t.get('emptyValue')}
        parentCompanyId={14}
        parentCompany={'parentCompany'}
        statusInfo={[]}
        docInfo={[]}
        translations={[]}
      /> */}
    </PageWrapper>
  );
};

export default GameDetails;

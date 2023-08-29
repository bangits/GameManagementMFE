import { ProviderDetailsViewModel } from '@/atom-game-management';
import { PrimaryKey, convertDate, useTranslation } from '@atom/common';
import { CountView, NameDescription, ProfileBlock } from '@atom/design-system';
import { useMemo } from 'react';
import { css } from 'styled-system/css';

export interface ProviderDetailsSidebarProps {
  data: ProviderDetailsViewModel;
  onBackgroundImgClick: () => void;
}

export const ProviderDetailsSidebar = ({ data, onBackgroundImgClick }: ProviderDetailsSidebarProps) => {
  const t = useTranslation();

  const nameDescriptionData = useMemo(
    () => [
      {
        name: t.get('creationDate'),
        description: convertDate(data.creationDate)
      },
      {
        name: t.get('createdBy'),
        description: data.createdByUserEmail
      },
      {
        name: t.get('lastUpdateDate'),
        description: convertDate(data.lastUpdatedDate)
      },
      {
        name: t.get('lastUpdateBy'),
        description: data.lastUpdatedByUserEmail
      }
    ],
    [data]
  );

  return (
    <div className={css({ width: '23rem' })}>
      <ProfileBlock
        backgroundImgUrl={data.logo}
        itemId={`${t.get('id')} ${data.id}`}
        itemName={data.providerName}
        onBackgroundImgClick={onBackgroundImgClick}
      />

      <div>
        <NameDescription
          noDataText={t.get('emptyValue')}
          data={[
            {
              name: t.get('integrationTypeName'),
              description: data.integrationTypeName
            },
            {
              name: t.get('aggregator'),
              description: data.partnerName
            }
          ]}
        />
      </div>

      <div className={css({ marginTop: '1rem' })}>
        <CountView noDataText={t.get('emptyValue')} title={t.get('totalGameCount')} count={data.gameCount as string} />
      </div>

      <div className={css({ marginTop: '1rem' })}>
        <NameDescription noDataText={t.get('emptyValue')} data={nameDescriptionData} />
      </div>
    </div>
  );
};

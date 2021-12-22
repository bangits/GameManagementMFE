import { providerApi } from '@/adapter/redux/api';
import { ProviderStatusesEnum } from '@/domain/models';
import { showProviderActivateDialog, showProviderInActivateDialog } from '@/view/dialogs';
import { ProviderDetailsViewModel } from '@/view/models/view-models/provider/ProviderDetailsViewModel';
import { useActionWithDialog, useTranslation } from '@atom/common';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProviderDetails from './ProviderDetails';

const ProviderDetailsContainer = () => {
  const params = useParams<{ providerId: string }>();

  const t = useTranslation();

  const dispatch = useDispatch();

  const { data, isFetching, originalArgs } = providerApi.useGetProvidersByIdQuery(+params.providerId);

  const [changeProviderStatus] = providerApi.useChangeProviderStatusMutation();
  const [updateProviderLogo] = providerApi.useUpdateProviderLogoMutation();

  const { openDialogFn: onActivateButtonClick } = useActionWithDialog<ProviderDetailsViewModel>({
    dialogFn: showProviderActivateDialog,
    actionFn: (providerIds) => changeProviderStatus({ providerIds, statusId: ProviderStatusesEnum.Active }).unwrap(),
    isFetching,
    t,
    refetch: () => {
      dispatch(
        providerApi.util.updateQueryData('getProvidersById', originalArgs, (draft) => {
          Object.assign(draft, {
            statusId: ProviderStatusesEnum.Active
          });
        })
      );
    },
    getColumnId: (column) => column.id
  });

  const { openDialogFn: onInActivateButtonClick } = useActionWithDialog<ProviderDetailsViewModel>({
    dialogFn: showProviderInActivateDialog,
    actionFn: (providerIds) => changeProviderStatus({ providerIds, statusId: ProviderStatusesEnum.Inactive }).unwrap(),
    isFetching,
    t,
    refetch: () => {
      dispatch(
        providerApi.util.updateQueryData('getProvidersById', originalArgs, (draft) => {
          Object.assign(draft, {
            statusId: ProviderStatusesEnum.Inactive
          });
        })
      );
    },
    getColumnId: (column) => column.id
  });

  const onProviderLogoChange = useCallback(
    (updatedLogo) => {
      updateProviderLogo({
        logo: updatedLogo,
        providerId: data.providerId
      })
        .unwrap()
        .then(() => {
          dispatch(
            providerApi.util.updateQueryData('getProvidersById', originalArgs, (draft) => {
              Object.assign(draft, {
                logo: updatedLogo
              });
            })
          );
        });
    },
    [data]
  );

  if (!data) return null;

  return (
    <ProviderDetails
      data={data}
      onActivateButtonClick={() => onActivateButtonClick(data)}
      onInActivateButtonClick={() => onInActivateButtonClick(data)}
      shouldShowActivateButton={data.statusId === ProviderStatusesEnum.Inactive}
      shouldShowInActivateButton={data.statusId === ProviderStatusesEnum.Active}
      onProviderLogoChange={onProviderLogoChange}
    />
  );
};

export default ProviderDetailsContainer;

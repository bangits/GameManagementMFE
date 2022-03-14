import { providerApi } from '@/adapter/redux/api';
import { ProviderStatusesEnum } from '@/domain/models';
import { showProviderActivateDialog, showProviderInActivateDialog } from '@/view/dialogs';
import { GetProvidersViewModel, ProvidersFiltersViewModel, ProvidersViewModel } from '@/view/models';
import { AuthenticatedContext } from '@atom/authorization';
import { SortTypesEnum, useActionWithDialog, useFirstValue, useTranslation } from '@atom/common';
import { useContext, useMemo, useState } from 'react';
import ProviderList from './ProviderList';

const ProviderListContainer = () => {
  const t = useTranslation();

  const { user } = useContext(AuthenticatedContext);

  const providerName =
    user.userId === 8285 ? 'Golden Race' : user.userId === 8286 ? 'Rival' : user.userId === 8287 ? 'Bgaming' : '';

  const filtersInitialValues = useMemo<ProvidersFiltersViewModel>(
    () => ({
      providerId: '',
      partnerId: '',
      providerName,
      integrationTypeId: null,
      currency: [],
      gameCount: {
        from: null,
        to: null
      },
      status: [],
      sorting: null,
      pagination: {
        page: 1,
        pageSize: 20
      }
    }),
    [providerName]
  );

  const [filters, setFilters] = useState<ProvidersFiltersViewModel>(filtersInitialValues);

  const { data, requestId, isFetching, refetch } = providerApi.useGetProviderQuery(filters);

  const [changeProviderStatus] = providerApi.useChangeProviderStatusMutation();

  const { results, rowCount } = (data || {}) as GetProvidersViewModel;

  const firstRequestId = useFirstValue(requestId);

  const { openDialogFn: onActivateButtonClick, columnLoadingIds: activeColumnLoadingIds } =
    useActionWithDialog<ProvidersViewModel>({
      dialogFn: showProviderActivateDialog,
      actionFn: (providerIds) => changeProviderStatus({ providerIds, statusId: ProviderStatusesEnum.Active }).unwrap(),
      isFetching,
      t,
      refetch,
      getColumnId: (column) => column.providerId
    });

  const { openDialogFn: onInActivateButtonClick, columnLoadingIds: inActiveColumnLoadingIds } =
    useActionWithDialog<ProvidersViewModel>({
      dialogFn: showProviderInActivateDialog,
      actionFn: (providerIds) =>
        changeProviderStatus({ providerIds, statusId: ProviderStatusesEnum.Inactive }).unwrap(),
      isFetching,
      t,
      refetch,
      getColumnId: (column) => column.providerId
    });

  const providerTableLoadingIds = useMemo(
    () => [...activeColumnLoadingIds, ...inActiveColumnLoadingIds],
    [activeColumnLoadingIds, inActiveColumnLoadingIds]
  );

  return (
    <>
      <ProviderList
        results={results || []}
        providerName={providerName}
        isFilteredData={firstRequestId !== requestId}
        isFetching={isFetching}
        refetch={refetch}
        rowCount={rowCount}
        onFiltersChange={(parameters) => {
          const sorting = parameters.sortedBy
            ? {
                direction: parameters.sortedBy.desc ? SortTypesEnum.DESC : SortTypesEnum.ASC,
                propertyId: parameters.sortedBy.id
              }
            : null;

          setFilters({
            ...filters,
            ...parameters.filters,
            sorting
          });
        }}
        filtersInitialValues={filtersInitialValues}
        onActivateButtonClick={onActivateButtonClick}
        onInActivateButtonClick={onInActivateButtonClick}
        shouldShowActivateButton={(column) => column.status === ProviderStatusesEnum.Inactive}
        shouldShowInActivateButton={(column) => column.status === ProviderStatusesEnum.Active}
        partnersTableLoadingIds={providerTableLoadingIds}
      />
    </>
  );
};

export default ProviderListContainer;

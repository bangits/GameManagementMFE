import { GetProviderRequestModel } from '@/domain/models';
import { CurrencySelect } from '@atom/common';
import { DataTable } from '@atom/design-system';
import React, { FC, useState } from 'react';
import { ProvidersSelect } from '../selects/ProviderSelect';

export type ProviderListActions = {};

export type ProviderListState = {};

export type ProviderListProps = ProviderListActions & ProviderListState;

const ProviderList: FC<ProviderListProps> = () => {
  const [filters, setFilters] = useState<GetProviderRequestModel>({
    providerId: null,
    name: '',
    gameCountFrom: null,
    gameToFrom: null,
    statusId: null,
    providerDefaultCurrencyIds: [],
    providerCurrenyIds: [],
    targetMarketsIds: [],
    certifiedCountryIds: [],
    restrictedCountryIds: [],
    direction: null,
    property: '',
    lastUpdatedDateFrom: '',
    lastUpdatedDateTo: '',
    registrationDateFrom: '',
    registrationDateTo: ''
  });

  // const { data } = providerApi.useGetProviderQuery(filters);
  // const { results } = data;

  // if (!data) null;

  return (
    <div>
      <ProvidersSelect />
      {/* @ts-ignore */}
      <CurrencySelect />
      <DataTable
        fetchData={(e) => {
          //@ts-ignore
          setFilters({ ...filters, ...e.filters, ...e.sortedBy });
        }}
        filterProps={{
          defaultOpened: true,
          initialValues: filters,
          filters: [
            {
              name: 'providerName',
              type: 'select',
              props: {
                inputLabel: 'Provider Name',
                inputSelectedLabel: 'Selected providers are: ',
                options: [
                  { label: 'Provider 1', value: 1 },
                  { label: 'Provider 2', value: 2 },
                  { label: 'Provider 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'providerId',
              type: 'input',
              props: {
                label: 'Provider ID'
              }
            },
            {
              type: 'from-to',
              name: 'gameCount',
              fromInputProps: {
                label: 'Game Count - From'
              },
              toInputProps: {
                label: 'Game Count - To'
              }
            },
            {
              name: 'currency',
              type: 'select',
              props: {
                inputLabel: 'Default currency',
                inputSelectedLabel: 'Selected subtypes are: ',
                options: [
                  { label: 'AMD', value: 1 },
                  { label: 'USD', value: 2 },
                  { label: 'RUB', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'status',
              type: 'select',
              props: {
                inputLabel: 'Status',
                options: [
                  { label: 'Active', value: 1 },
                  { label: 'Blocked', value: 2 }
                ],
                isSearchable: true,
                isMulti: true
              }
            }
          ],
          checkboxFilters: [],
          resultLabel: '1062 users found',
          applyLabel: 'Apply',
          clearLabel: 'Clear'
        }}
        tableProps={{
          data: [],
          columns: [
            {
              Header: 'Provider ID',
              accessor: 'id'
            },
            {
              Header: 'Logo',
              accessor: 'logo'
            },
            {
              Header: 'Provider name ',
              accessor: 'name'
            },
            {
              Header: 'Total game count',
              accessor: 'gameCount'
            },
            {
              Header: 'Default currency',
              accessor: 'defaultCurrency.code'
            },
            {
              Header: 'Status',
              accessor: 'status.name'
            }
          ]
          //   {
          //     component: IconButton,
          //     onClick: () => {},
          //     props: {
          //       icon: <ViewIcon />
          //     }
          //   },
          // ]},
        }}
      />
    </div>
  );
};

export default ProviderList;

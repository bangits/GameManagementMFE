//@ts-ignore
import { DataTable } from '@atom/design-system';
import React, { FC, useEffect } from 'react';

export type ProviderListActions = {};

export type ProviderListState = {};

export type ProviderListProps = ProviderListActions & ProviderListState;

const ProviderList: FC<ProviderListProps> = () => {
  useEffect(() => {}, []);
  console.log('ProviderListProps');

  return (
    <div>
      <DataTable
        filterProps={{
          defaultOpened: true,
          initialValues: {
            gameId: '1256789DS',
            externalId: '',
            gameName: '',
            type: '',
            checkbox: {},
            betRange: {},
            platform: [1],
            providerName: [{ label: 'Provider 1', value: 1 }],
            theme: [
              { label: 'Theme 1', value: 1 },
              { label: 'Theme 2', value: 2 }
            ],
            status: '2',
            rtp: { from: '500', to: '5000000' }
          },
          filters: [
            {
              name: 'gameId',
              type: 'input',
              props: {
                label: 'Game ID'
              }
            },
            {
              name: 'externalId',
              type: 'input',
              props: {
                label: 'External ID'
              }
            },
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
              name: 'gameName',
              type: 'input',
              props: {
                label: 'Game Name'
              }
            },
            {
              name: 'theme',
              type: 'select',
              props: {
                inputLabel: 'Theme',
                inputSelectedLabel: 'Selected themes are: ',
                options: [
                  { label: 'Theme 1', value: 1 },
                  { label: 'Theme 2', value: 2 },
                  { label: 'Theme 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'type',
              type: 'select',
              props: {
                inputLabel: 'Type',
                inputSelectedLabel: 'Selected types are: ',
                options: [
                  { label: 'Type 1', value: 1 },
                  { label: 'Type 2', value: 2 },
                  { label: 'Type 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'subtype',
              type: 'select',
              props: {
                inputLabel: 'Subtype',
                inputSelectedLabel: 'Selected subtypes are: ',
                options: [
                  { label: 'Subtype 1', value: 1 },
                  { label: 'Subtype 2', value: 2 },
                  { label: 'Subtype 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              type: 'from-to',
              name: 'rtp',
              fromInputProps: {
                label: 'RTP-From'
              },
              toInputProps: {
                label: 'RTP-To'
              }
            },
            {
              name: 'date',
              type: 'select',
              props: {
                inputLabel: 'Date',
                options: [
                  { label: 'Date 1', value: 1 },
                  { label: 'Date 2', value: 2 },
                  { label: 'Date 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'feature',
              type: 'select',
              props: {
                inputLabel: 'Feature',
                inputSelectedLabel: 'Selected futures are: ',
                options: [
                  { label: 'Feature 1', value: 1 },
                  { label: 'Feature 2', value: 2 },
                  { label: 'Feature 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'sort',
              type: 'select',
              props: {
                inputLabel: 'Sort',
                inputSelectedLabel: 'Selected sorts are: ',
                options: [
                  { label: 'Sort 1', value: 1 },
                  { label: 'Sort 2', value: 2 },
                  { label: 'Sort 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'currency',
              type: 'select',
              props: {
                inputLabel: 'Currency',
                inputSelectedLabel: 'Selected currencies are: ',
                options: [
                  { label: 'Currency 1', value: 1 },
                  { label: 'Currency 2', value: 2 },
                  { label: 'Currency 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'defaultCurrency',
              type: 'select',
              props: {
                inputLabel: 'Default Currency',
                inputSelectedLabel: 'Selected def. Curr. are: ',
                options: [
                  { label: 'Default Currency 1', value: 1 },
                  { label: 'Default Currency 2', value: 2 },
                  { label: 'Default Currency 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'volatility',
              type: 'select',
              props: {
                inputLabel: 'Volatility',
                inputSelectedLabel: 'Selected volatilities are: ',
                options: [
                  { label: 'Volatility 1', value: 1 },
                  { label: 'Volatility 2', value: 2 },
                  { label: 'Volatility 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'uiLanguages',
              type: 'select',
              props: {
                inputLabel: 'UI Languages',
                inputSelectedLabel: 'Selected languages are: ',
                options: [
                  { label: 'UI Language 1', value: 1 },
                  { label: 'UI Language 2', value: 2 },
                  { label: 'UI Language 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              type: 'from-to',
              name: 'min',
              fromInputProps: {
                label: 'Min bet-From'
              },
              toInputProps: {
                label: 'Min bet-To'
              }
            },
            {
              type: 'from-to',
              name: 'max',
              fromInputProps: {
                label: 'Max bet-From'
              },
              toInputProps: {
                label: 'Max bet-To'
              }
            },
            {
              type: 'from-to',
              name: 'win',
              fromInputProps: {
                label: 'Win-From'
              },
              toInputProps: {
                label: 'Win-To'
              }
            },
            {
              name: 'operatingLanguages',
              type: 'select',
              props: {
                inputLabel: 'Operating languages',
                inputSelectedLabel: 'Selected op. langs are: ',
                options: [
                  { label: 'Operating language 1', value: 1 },
                  { label: 'Operating language 2', value: 2 },
                  { label: 'Operating language 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'restrictedCountries',
              type: 'select',
              props: {
                inputLabel: 'Restricted countries',
                inputSelectedLabel: 'Selected rest. cn. are: ',
                options: [
                  { label: 'Restricted country 1', value: 1 },
                  { label: 'Restricted country 2', value: 2 },
                  { label: 'Restricted country 3', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'supportedBrowsers',
              type: 'select',
              props: {
                inputLabel: 'Supported browsers',
                inputSelectedLabel: 'Selected browsers are: ',
                options: [
                  { label: 'Google Chrome', value: 1 },
                  { label: 'Mozilla FireFox', value: 2 },
                  { label: 'Opera', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              name: 'creationDate',
              type: 'select',
              props: {
                inputLabel: 'Creation Date',
                inputSelectedLabel: 'Selected dates are: ',
                options: [
                  { label: '19/09/19 12:00', value: 1 },
                  { label: '19/09/19 12:00', value: 2 },
                  { label: '19/09/19 12:00', value: 3 }
                ],
                isSearchable: true,
                isMulti: true
              }
            },
            {
              type: 'radio',
              label: 'Status',
              name: 'status',
              props: [
                {
                  value: '1',
                  label: 'Active',
                  name: 'active'
                },
                {
                  value: '2',
                  label: 'Inactive',
                  name: 'inactive'
                }
              ]
            }
          ],
          checkboxFilters: [
            {
              name: 'platform',
              type: 'checkbox',
              label: 'Platform',
              checkboxProps: [
                {
                  label: 'Desktop',
                  name: 'desktop',
                  value: 1
                },
                {
                  label: 'Tablet',
                  name: 'tablet',
                  value: 2
                },
                {
                  label: 'Mobile',
                  name: 'mobile',
                  value: 3
                }
              ]
            },
            {
              name: 'landscape',
              label: 'Mobile Screen Mode',
              type: 'checkbox',
              checkboxProps: [
                {
                  label: 'Landscape',
                  name: 'landscape',
                  value: 1
                },
                {
                  label: 'Portrait',
                  name: 'portrait',
                  value: 2
                }
              ]
            },
            {
              label: 'Tablet Screen Mode',
              name: 'portrait',
              type: 'checkbox',
              checkboxProps: [
                {
                  label: 'Landscape',
                  value: 1,
                  name: 'secondLandscape'
                },
                {
                  label: 'Portrait',
                  value: 2,
                  name: 'secondPortrait'
                }
              ]
            }
          ],
          resultLabel: '1062 users found',
          applyLabel: 'Apply',
          clearLabel: 'Clear'
        }}
        tableProps={{
          data: [],
          columns: []
        }}
      />
    </div>
  );
};

export default ProviderList;

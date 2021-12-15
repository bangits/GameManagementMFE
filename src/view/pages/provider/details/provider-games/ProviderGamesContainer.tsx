//@ts-expect-error not exported Component
import { ProviderGames } from '@atom/design-system';

export const ProviderGamesContainer = () => {
  return (
    <ProviderGames
      searchInputMaxLength={30}
      translations={{
        addGame: 'Add Game',
        noGames: 'No Games',
        search: 'Search'
      }}
      gameTypes={[
        {
          id: 1,
          name: 'Main Category',
          gameCount: 9
        },
        {
          id: 2,
          name: 'Category',
          gameCount: 29
        }
      ]}
      games={[
        {
          id: 25,
          name: 'EGT',
          icon: null
        },
        {
          id: 26,
          name: 'EGT',
          icon: null
        },
        {
          id: 27,
          name: 'EGT',
          icon: null
        },
        {
          id: 28,
          name: 'EGT',
          icon: null
        },
        {
          id: 29,
          name: 'EGT',
          icon: null
        },
        {
          id: 30,
          name: 'քոեռտըւ',
          icon: null
        },
        {
          id: 31,
          name: 'ԱԱԱՍՍՍԲԲԲԲԲ',
          icon: null
        },
        {
          id: 32,
          name: '                                                 1',
          icon: null
        },
        {
          id: 33,
          name: 'սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ  ',
          icon: null
        },
        {
          id: 34,
          name: 'սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ սլօտ %  ',
          icon: null
        },
        {
          id: 35,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 36,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 37,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 38,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 39,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 40,
          name: '!@#$%^&&^%$#@#$F%^%$#',
          icon: null
        },
        {
          id: 41,
          name: 'stringfg',
          icon: null
        },
        {
          id: 42,
          name: 'string',
          icon: null
        },
        {
          id: 43,
          name: 'string',
          icon: null
        }
      ]}
      onChange={console.log}
      onGameClick={console.log}
      onAddGameClick={console.log}
      isLoadingGames={false}
    />
  );
};

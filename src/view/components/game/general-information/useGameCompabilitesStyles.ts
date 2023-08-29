import { css } from 'styled-system/css';

export const useGameCompabilitesStyles = () => {
  return {
    CardInner: css({ borderRadius: '2.6rem', minHeight: '100%' }),
    CardInner__lvl_1: css({ background: 'white', padding: '1.6rem 2.4rem 2.4rem 2.4rem' }),
    CardInner__lvl_2: css({ padding: '1.6rem 1.6rem 0 1.6rem' }),
    FlexList: css({
      display: 'flex'
    }),
    FlexList__item: css({ paddingRight: '2rem', marginRight: '2rem', color: 'red' }),
    CardSubtitle: css({
      display: 'block',
      fontFamily: 'inherit',
      fontSize: '1.2rem',
      lineHeight: '1.4rem',
      color: 'nepal'
    }),
    TagsCell: css({
      display: 'flex',
      padding: '0.7rem 0 1.8rem 0',

      '& > svg': { marginRight: '1rem' },
      '& > div': { marginRight: '1rem' }
    }),
    GameDetailsBase__notCompleted: css({ color: 'black-color', marginRight: '1rem' }),
    DeviceTag: css({
      display: 'inline-flex',
      padding: '0.3rem 1.6rem 0.7rem 0',
      borderRadius: '0.6rem',
      cursor: 'default',

      '& > svg': { fill: 'black-color', marginRight: '1rem' }
    }),
    DeviceTag__Label: css({
      fontFamily: 'inherit',
      fontSize: '1.4rem',
      lineHeight: '1.7rem',
      marginRight: '1rem',
      color: 'black-color'
    })
  };
};

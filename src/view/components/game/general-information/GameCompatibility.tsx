import { FC } from 'react';
import {
  BrowsersCheckboxGroup,
  BrowsersCheckboxGroupProps,
  Countries,
  CurrencyGroup,
  LabelGroup,
  LanguagesGroup,
  Typography,
  Icons
} from '@atom/design-system';
import classNames from 'classnames';
import { useGameCompabilitesStyles } from './useGameCompabilitesStyles';

export interface GameCompatibilityProps {
  translations: {
    noDataText: string;
    devices: string;
    mobileScreenMode: string;
    tableScreenMode: string;
    uiLanguages: string;
    operatingLanguages: string;
    certifiedCountries: string;
    restrictedCountries: string;
    currencies: string;
    supportedBrowsers: string;
    mobile: string;
    tablet: string;
    desktop: string;
    portrait: string;
    landscape: string;
  };
  devices: (number | string)[];
  mobilePortrait: boolean;
  mobileLandscape: boolean;
  desktopPortrait: boolean;
  desktopLandscape: boolean;

  uiLanguages: any;
  operatingLanguages: any;
  certifiedCountries: any;
  restrictedCountries: any;
  currencies: any;
  supportedBrowsers: BrowsersCheckboxGroupProps;
}

const GameCompatibility: FC<GameCompatibilityProps> = ({
  uiLanguages,
  certifiedCountries,
  currencies,
  operatingLanguages,
  restrictedCountries,
  supportedBrowsers,
  translations,
  devices,
  mobilePortrait,
  mobileLandscape,
  desktopPortrait,
  desktopLandscape
}) => {
  const styles = useGameCompabilitesStyles();

  return (
    <>
      <div className={classNames(styles.CardInner, styles.CardInner__lvl_2)}>
        <div className={classNames(styles.FlexList)}>
          <div className={classNames(styles.FlexList__item)}>
            <div className={classNames(styles.CardSubtitle)}>{translations.devices}</div>
            <div className={classNames(styles.TagsCell)}>
              {devices.length === 0 ? (
                <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
                  {translations.noDataText}
                </Typography>
              ) : (
                devices?.map((id) =>
                  id === 1 ? (
                    <>
                      <span key={id} className={classNames(styles.DeviceTag)}>
                        <Icons.MobileIcon width='1rem' />
                        <span className={classNames(styles.DeviceTag__Label)}>{translations.mobile}</span>
                      </span>
                    </>
                  ) : id === 2 ? (
                    <>
                      <span key={id} className={classNames(styles.DeviceTag)}>
                        <Icons.TabletIcon width='2rem' />
                        <span className={classNames(styles.DeviceTag__Label)}>{translations.tablet}</span>
                      </span>
                    </>
                  ) : id === 3 ? (
                    <>
                      <span key={id} className={classNames(styles.DeviceTag)}>
                        <Icons.DesktopIcon width='2.2rem' />
                        <span className={classNames(styles.DeviceTag__Label)}>{translations.desktop}</span>
                      </span>
                    </>
                  ) : (
                    <></>
                  )
                )
              )}
            </div>
          </div>

          <div className={classNames(styles.FlexList__item)}>
            <div className={classNames(styles.CardSubtitle)}>{translations.mobileScreenMode}</div>
            <div className={classNames(styles.TagsCell)}>
              {mobilePortrait ? (
                <span className={classNames(styles.DeviceTag)}>
                  <Icons.MobileIcon width='1rem' />
                  <span className={classNames(styles.DeviceTag__Label)}>{translations.portrait}</span>
                </span>
              ) : (
                <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
                  {translations.noDataText}
                </Typography>
              )}

              {mobileLandscape ? (
                <span className={classNames(styles.DeviceTag)}>
                  <Icons.TabletIcon width='2rem' />
                  <span className={classNames(styles.DeviceTag__Label)}>{translations.landscape}</span>
                </span>
              ) : (
                <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
                  <></>
                </Typography>
              )}
            </div>
          </div>

          <div className={classNames(styles.FlexList__item)}>
            <div className={classNames(styles.CardSubtitle)}>{translations.tableScreenMode}</div>
            <div className={classNames(styles.TagsCell)}>
              {desktopPortrait ? (
                <span className={classNames(styles.DeviceTag)}>
                  <Icons.MobileIcon width='1rem' />
                  <span className={classNames(styles.DeviceTag__Label)}>{translations.portrait}</span>
                </span>
              ) : (
                <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
                  {translations.noDataText}
                </Typography>
              )}

              {desktopLandscape ? (
                <span className={classNames(styles.DeviceTag)}>
                  <Icons.TabletIcon width='2rem' />
                  <span className={classNames(styles.DeviceTag__Label)}>{translations.landscape}</span>
                </span>
              ) : (
                <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
                  <></>
                </Typography>
              )}
            </div>
          </div>
        </div>

        <LabelGroup title={translations.uiLanguages}>
          {uiLanguages.length === 0 ? (
            <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
              {translations.noDataText}
            </Typography>
          ) : (
            <LanguagesGroup tags={uiLanguages} />
          )}
        </LabelGroup>

        <LabelGroup title={translations.operatingLanguages}>
          {operatingLanguages.length === 0 ? (
            <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
              {translations.noDataText}
            </Typography>
          ) : (
            <LanguagesGroup tags={operatingLanguages} />
          )}
        </LabelGroup>

        <LabelGroup title={translations.certifiedCountries}>
          {certifiedCountries.length === 0 ? (
            <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
              {translations.noDataText}
            </Typography>
          ) : (
            <Countries tagCountries={certifiedCountries} />
          )}
        </LabelGroup>

        <LabelGroup title={translations.restrictedCountries}>
          {restrictedCountries.length === 0 ? (
            <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
              {translations.noDataText}
            </Typography>
          ) : (
            <Countries tagCountries={restrictedCountries} />
          )}
        </LabelGroup>

        <LabelGroup title={translations.currencies}>
          {currencies.length === 0 ? (
            <Typography variant='p4' className={styles.GameDetailsBase__notCompleted}>
              {translations.noDataText}
            </Typography>
          ) : (
            <CurrencyGroup currencies={currencies} />
          )}
        </LabelGroup>

        <LabelGroup title={'Supported Browsers'}>
          <BrowsersCheckboxGroup
            onChange={supportedBrowsers.onChange}
            browsersEnum={supportedBrowsers.browsersEnum}
            disabled={supportedBrowsers.disabled}
            values={supportedBrowsers.initialValues}
          />
        </LabelGroup>
      </div>
    </>
  );
};

export default GameCompatibility;

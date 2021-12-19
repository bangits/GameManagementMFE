import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import './index';
import App from './view';
import GameLauncher from './view/GameLauncher';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/game-management'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: App
});

export const gameLauncherLifecycles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/game-launcher'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: GameLauncher
});

export const { bootstrap, mount, unmount } = lifecycles;

export * from './adapter/react-context';
export * from './view/components';


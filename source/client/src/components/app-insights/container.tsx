//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { createBrowserHistory } from 'history';

import Presenter from './presenter';

const browserHistory = createBrowserHistory({ basename: '' });

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.APP_INSIGHTS_INSTRUMENTATION_KEY,
    extensions: [ reactPlugin ],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});

appInsights.loadAppInsights();

export default withAITracking(reactPlugin, Presenter);

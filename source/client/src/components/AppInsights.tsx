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

import Presenter from './AppInsights.presenter';

const browserHistory = createBrowserHistory();
const reactPlugin = new ReactPlugin();

const instrumentationKey = process.env.VITE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY;
if (instrumentationKey) {
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: instrumentationKey,
      extensions: [ reactPlugin ],
      extensionConfig: {
        [reactPlugin.identifier]: { history: browserHistory }
      }
    }
  });
  appInsights.loadAppInsights();
}

export default withAITracking(reactPlugin, Presenter);

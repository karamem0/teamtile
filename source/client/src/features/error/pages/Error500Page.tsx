//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';

import Presenter from './Error500Page.presenter';

interface Error500PageProps {
  error?: Error
}

function Error500Page(props: Readonly<Error500PageProps>) {

  const { error } = props;

  const appInsights = useAppInsightsContext();

  React.useEffect(() => {
    appInsights.trackException({ exception: error });
  }, [
    appInsights,
    error
  ]);

  return (
    <Presenter error={error?.message} />
  );

}

export default Error500Page;

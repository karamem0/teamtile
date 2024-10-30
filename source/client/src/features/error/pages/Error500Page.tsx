//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Error500Page.presenter';
import { useTelemetry } from '../../../providers/TelemetryProvider';

interface Error500PageProps {
  error?: Error
}

function Error500Page(props: Readonly<Error500PageProps>) {

  const { error } = props;

  const { trackException } = useTelemetry();

  React.useEffect(() => {
    trackException({
      exception: error
    });
  }, [
    error,
    trackException
  ]);

  return (
    <Presenter error={error?.message} />
  );

}

export default Error500Page;

//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useErrorContext } from '../../contexts/error-context';

import Presenter from './presenter';

export default function ErrorBar (): React.ReactElement | null {

  const { error, setError } = useErrorContext();

  const handleVisibleChange = React.useCallback(() => {
    setError(null);
  }, [
    setError
  ]);

  return (
    <Presenter
      message={error}
      onVisibleChange={handleVisibleChange} />
  );

}

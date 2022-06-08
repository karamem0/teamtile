//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './presenter';

interface ErrorPanelProps {
  error: string
}

export default function ErrorPanel ({
  error
}: ErrorPanelProps): React.ReactElement | null {

  return (
    <Presenter error={error} />
  );

}

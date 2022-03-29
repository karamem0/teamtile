//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './presenter';

interface CenterLayoutProps {
  children: React.ReactNode
}

export default function CenterLayout ({
  children
}: CenterLayoutProps): React.ReactElement | null {

  return (
    <Presenter>
      {children}
    </Presenter>
  );

}

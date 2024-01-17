//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './CenterLayout.presenter';

interface CenterLayoutProps {
  children?: React.ReactNode
}

function CenterLayout(props: Readonly<CenterLayoutProps>) {

  const { children } = props;

  return (
    <Presenter>
      {children}
    </Presenter>
  );

}

export default CenterLayout;

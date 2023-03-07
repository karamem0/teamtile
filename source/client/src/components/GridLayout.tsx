//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './GridLayout.presenter';

interface GridLayoutProps {
  children?: React.ReactNode
}

function GridLayout(props: GridLayoutProps) {

  const { children } = props;

  return (
    <Presenter>
      {children}
    </Presenter>
  );

}

export default GridLayout;

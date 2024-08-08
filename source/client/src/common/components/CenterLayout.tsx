//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './CenterLayout.presenter';

function CenterLayout(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <Presenter>
      {children}
    </Presenter>
  );

}

export default CenterLayout;

//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Loader } from '@fluentui/react-northstar';

import CenterLayout from './CenterLayout';

function LoaderPanel() {

  return (
    <CenterLayout>
      <Loader />
    </CenterLayout>
  );

}

export default React.memo(LoaderPanel);

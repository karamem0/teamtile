//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Spinner } from '@fluentui/react-components';

import CenterLayout from './CenterLayout';

function LoaderPanel() {

  return (
    <CenterLayout>
      <Spinner />
    </CenterLayout>
  );

}

export default React.memo(LoaderPanel);

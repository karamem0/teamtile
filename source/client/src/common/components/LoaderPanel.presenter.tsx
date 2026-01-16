//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CenterLayout from './CenterLayout';
import { Spinner } from '@fluentui/react-components';

function LoaderPanel() {

  return (
    <CenterLayout>
      <Spinner />
    </CenterLayout>
  );

}

export default React.memo(LoaderPanel);

//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Loader } from '@fluentui/react-northstar';

import CenterLayout from '../../../components/CenterLayout';

function LoginPage() {

  return (
    <CenterLayout>
      <Loader label="Redirecting to consent page..." />
    </CenterLayout>
  );

}

export default React.memo(LoginPage);

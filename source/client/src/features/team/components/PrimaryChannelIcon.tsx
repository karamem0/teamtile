//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './PrimaryChannelIcon.presenter';

export interface PrimaryChannelIconProps {
  primary?: boolean
}

function PrimaryChannelIcon(props: Readonly<PrimaryChannelIconProps>) {

  const { primary } = props;

  return (
    <Presenter primary={primary} />
  );

}

export default PrimaryChannelIcon;

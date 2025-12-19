//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './SummaryIcon.presenter';

interface SummaryIconProps {
  count?: number,
  icon?: React.ReactElement,
  tooltip?: string
}

function SummaryIcon(props: Readonly<SummaryIconProps>) {

  const {
    count,
    icon,
    tooltip
  } = props;

  return (
    <Presenter
      count={count}
      icon={icon}
      tooltip={tooltip} />
  );

}

export default SummaryIcon;

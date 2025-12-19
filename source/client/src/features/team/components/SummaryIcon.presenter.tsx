//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-components';
import { css } from '@emotion/react';

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
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        gap: 0.125rem;
      `}>
      <Tooltip
        content={tooltip ?? ''}
        relationship="label">
        {icon}
      </Tooltip>
      <Text
        css={css`
          font-size: 0.75rem;
          line-height: calc(0.75rem * 1.25);
      `}>
        {count}
      </Text>
    </div>
  );

}

export default React.memo(SummaryIcon);

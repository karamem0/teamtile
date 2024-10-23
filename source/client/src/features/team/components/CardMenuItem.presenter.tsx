//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Text,
  Tooltip
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';

interface CardMenuItemProps {
  icon?: React.ReactElement,
  title?: string,
  onClick?: EventHandler
}

function CardMenuItem(props: Readonly<CardMenuItemProps>) {

  const {
    icon,
    title,
    onClick
  } = props;

  return title ? (
    <Tooltip
      content={title}
      relationship="label">
      <Text
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto auto;
          grid-gap: 0.25rem;
          align-items: center;
          justify-content: start;
          cursor: pointer;
        `}>
        <Button
          appearance="transparent"
          icon={icon}
          onClick={onClick} />
      </Text>
    </Tooltip>
  ) : (
    <Text
      css={css`
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: auto auto;
      grid-gap: 0.25rem;
      align-items: center;
      justify-content: start;
      cursor: pointer;
    `}>
      <Button
        appearance="transparent"
        icon={icon}
        onClick={onClick} />
    </Text>
  );

}

export default React.memo(CardMenuItem);

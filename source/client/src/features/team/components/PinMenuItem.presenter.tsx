//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@fluentui/react-components';
import { PinnedIcon, UnpinIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

import CardMenuItem from './CardMenuItem';

interface PinMenuItemProps {
  pinned?: boolean,
  onClick?: EventHandler<boolean>
}

function PinMenuItem(props: Readonly<PinMenuItemProps>) {

  const {
    pinned,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      tooltip={pinned ? intl.formatMessage(messages.Unpin) : intl.formatMessage(messages.Pin)}
      onClick={(e) => onClick?.(e, !pinned)}>
      <Button
        appearance="transparent"
        icon={
          pinned ? (
            <UnpinIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          ) : (
            <PinnedIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          )} />
    </CardMenuItem>
  );

}

export default React.memo(PinMenuItem);

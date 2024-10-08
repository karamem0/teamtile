//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { PinnedIcon, UnpinIcon } from '@fluentui/react-icons-mdl2';
import { Button } from '@fluentui/react-components';
import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

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
      onClick={onClick}>
      <Button
        appearance="transparent"
        icon={
          pinned ? (
            <UnpinIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          ) : (
            <PinnedIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )
        } />
    </CardMenuItem>
  );

}

export default React.memo(PinMenuItem);

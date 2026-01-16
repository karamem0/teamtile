//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Spinner
} from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../types/Event';
import { css } from '@emotion/react';

interface DrawerProps {
  loading?: boolean,
  mountNode?: HTMLElement,
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function Drawer(props: Readonly<React.PropsWithChildren<DrawerProps>>) {

  const {
    children,
    loading,
    mountNode,
    open,
    title,
    onOpenChange
  } = props;

  return (
    <React.Fragment>
      <OverlayDrawer
        as="aside"
        mountNode={mountNode}
        open={open}
        position="end"
        size="small"
        onOpenChange={(e, data) => onOpenChange?.(e, data.open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={(
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={(
                  <Dismiss16Regular />
                )}
                onClick={(event) => onOpenChange?.(event, false)} />
            )}>
            {title}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody
          role="group"
          tabIndex={0}
          css={css`
            margin-bottom: 1rem;
          `}>
          {
            loading ? (
              <Spinner />
            ) : children
          }
        </DrawerBody>
      </OverlayDrawer>
    </React.Fragment>
  );

}

export default React.memo(Drawer);

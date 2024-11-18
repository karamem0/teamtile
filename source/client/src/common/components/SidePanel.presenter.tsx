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
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Spinner
} from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../types/Event';
import { css } from '@emotion/react';

interface SidePanelProps {
  content?: React.ReactNode,
  loading?: boolean,
  mountNode?: HTMLElement,
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: Readonly<React.PropsWithChildren<SidePanelProps>>) {

  const {
    children,
    content,
    loading,
    mountNode,
    open,
    title,
    onOpenChange
  } = props;

  return (
    <React.Fragment>
      {children}
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
            ) : content
          }
        </DrawerBody>
      </OverlayDrawer>
    </React.Fragment>
  );

}

export default React.memo(SidePanel);

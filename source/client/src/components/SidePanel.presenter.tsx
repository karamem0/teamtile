//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { CloseIcon } from '@fluentui/react-icons-northstar';
import { Button, Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../types/Event';

interface SidePanelProps {
  content?: React.ReactNode,
  open?: boolean,
  title?: React.ReactNode,
  trigger?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: SidePanelProps) {

  const {
    content,
    open,
    title,
    trigger,
    onOpenChange
  } = props;

  return (
    <React.Fragment>
      <div onClick={(event) => onOpenChange?.(event, true)}>
        {trigger}
      </div>
      {
        open ? (
          <div
            css={css`
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 1000;
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: 1fr auto;
              background-color: rgb(255 255 255 / 35%);
            `}>
            <div
              css={css`
                cursor: pointer;
              `}
              onClick={(event) => onOpenChange?.(event, false)} />
            <div
              css={css`
                width: 20rem;
                max-width: calc(100vw - 2rem);
                background-color: #fff;
                box-shadow: rgb(0 0 0 / 35%) 0 0 2rem 0;
              `}>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: 1fr auto;
                  gap: 0.5rem;
                  align-items: center;
                  height: 2rem;
                  margin: 1rem;
                `}>
                <Text
                  size="large"
                  weight="bold">
                  {title}
                </Text>
                <Button
                  icon={<CloseIcon />}
                  iconOnly
                  text
                  onClick={(event) => onOpenChange?.(event, false)} />
              </div>
              <div
                css={css`
                  height: calc(100vh - 5rem);
                  margin: 1rem;
                  overflow: auto;
                `}>
                {content}
              </div>
            </div>
          </div>
        ) : null
      }
    </React.Fragment>
  );

}

export default SidePanel;

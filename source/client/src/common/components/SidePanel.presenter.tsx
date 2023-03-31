//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Button, Text } from '@fluentui/react-components';
import { CancelIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/Event';

interface SidePanelProps {
  children?: React.ReactNode,
  content?: React.ReactNode,
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: SidePanelProps) {

  const {
    children,
    content,
    open,
    title,
    onOpenChange
  } = props;

  return (
    <React.Fragment>
      <div onClick={(e) => onOpenChange?.(e, true)}>
        {children}
      </div>
      {
        open ? (
          <div
            css={css`
              position: fixed;
              inset: 0;
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
              onClick={(e) => onOpenChange?.(e, false)} />
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
                  grid-gap: 0.5rem;
                  align-items: center;
                  height: 2rem;
                  margin: 1rem;
                `}>
                <Text
                  css={css`
                    font-weight: 700;
                  `}>
                  {title}
                </Text>
                <Button
                  appearance="transparent"
                  icon={(
                    <CancelIcon
                      css={css`
                        width: 1rem;
                        height: 1rem;
                      `}
                      onClick={(e) => onOpenChange?.(e, false)} />
                  )} />
              </div>
              <div
                css={css`
                  height: calc(100vh - 5rem);
                  margin: 1rem;
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

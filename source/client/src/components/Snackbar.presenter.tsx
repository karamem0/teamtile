//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  ErrorBadgeIcon,
  InfoIcon,
  WarningIcon
} from '@fluentui/react-icons-mdl2';
import {
  Alert,
  AlertProps
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../types/Event';
import { SnackbarType } from '../types/Snackbar';

interface SnackbarProps {
  text?: string,
  type?: SnackbarType,
  onVisibleChange?: EventHandler<AlertProps>
}

function Snackbar(props: SnackbarProps) {

  const {
    text,
    type,
    onVisibleChange
  } = props;

  return text ? (
    <div
      css={css`
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1001;
        margin-bottom: 1rem;
      `}>
      {
        (() => {
          switch (type) {
            case SnackbarType.danger:
              return (
                <Alert
                  content={text}
                  danger
                  dismissible
                  icon={
                    <ErrorBadgeIcon />
                }
                  onVisibleChange={onVisibleChange} />
              );
            case SnackbarType.warning:
              return (
                <Alert
                  content={text}
                  dismissible
                  warning
                  icon={
                    <WarningIcon />
                  }
                  onVisibleChange={onVisibleChange} />
              );
            case SnackbarType.success:
              return (
                <Alert
                  content={text}
                  dismissible
                  success
                  icon={
                    <InfoIcon />
                    }
                  onVisibleChange={onVisibleChange} />
              );
            default:
              return (
                <Alert
                  content={text}
                  dismissible
                  info
                  icon={
                    <InfoIcon />
                    }
                  onVisibleChange={onVisibleChange} />
              );
          }
        })()
      }
    </div>
  ) : null;

}

export default React.memo(Snackbar);

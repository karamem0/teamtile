//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarIntent
} from '@fluentui/react-components';
import { EventHandler } from '../../types/Event';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import messages from '../messages';

interface SnackbarProps {
  intent?: MessageBarIntent,
  text?: string,
  onDismiss?: EventHandler
}

function Snackbar(props: Readonly<SnackbarProps>) {

  const {
    intent,
    text,
    onDismiss
  } = props;

  return text ? (
    <div
      css={css`
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1001;
        margin: 0.5rem;
      `}>
      <MessageBar intent={intent}>
        <MessageBarBody>
          {text}
        </MessageBarBody>
        <MessageBarActions
          containerAction={(
            <Link
              as="button"
              onClick={onDismiss}>
              <FormattedMessage {...messages.Dismiss} />
            </Link>
          )} />
      </MessageBar>
    </div>
  ) : null;

}

export default React.memo(Snackbar);

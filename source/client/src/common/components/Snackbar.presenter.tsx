//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { Alert } from '@fluentui/react-components/unstable';
import { ErrorBadgeIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/Event';
import { SnackbarType } from '../../types/Snackbar';
import messages from '../messages';

interface SnackbarProps {
  text?: string,
  type?: SnackbarType,
  onDismiss?: EventHandler
}

function Snackbar(props: Readonly<SnackbarProps>) {

  const {
    text,
    type,
    onDismiss
  } = props;

  const intl = useIntl();

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
      <Alert
        intent={type}
        action={{
          title: intl.formatMessage(messages.Dismiss),
          icon: (
            <ErrorBadgeIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          ),
          onClick: onDismiss
        }}>
        {text}
      </Alert>
    </div>
  ) : null;

}

export default React.memo(Snackbar);

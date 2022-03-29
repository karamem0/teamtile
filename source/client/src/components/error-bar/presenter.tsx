//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { WarningIcon } from '@fluentui/react-icons-mdl2';
import { Alert } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

interface ErrorBarProps {
  message: string | null | undefined,
  onVisibleChange: () => void
}

export default React.memo(function ErrorBar ({
  message,
  onVisibleChange
}: ErrorBarProps): React.ReactElement | null {

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}>
      <Alert
        content={message}
        dismissible
        icon={
          <WarningIcon />
        }
        variables={{ urgent: true }}
        onVisibleChange={onVisibleChange} />
    </div>
  );

});

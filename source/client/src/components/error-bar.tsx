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

import { useErrorContext } from '../contexts/error-context';

export const ErrorBar = (): React.ReactElement | null => {

  const { error, setError } = useErrorContext();

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}>
      <Alert
        content={error}
        dismissible
        icon={
          <WarningIcon />
        }
        variables={{ urgent: true }}
        onVisibleChange={() => setError && setError(null)} />
    </div>
  );

};

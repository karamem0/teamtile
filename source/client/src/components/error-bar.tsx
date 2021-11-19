//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { Alert } from '@fluentui/react-northstar';
import { WarningIcon } from '@fluentui/react-icons-mdl2';
// Contexts
import { useErrorContext } from '../contexts/error-context';

export const ErrorBar = (): React.ReactElement | null => {

  const { error, setError } = useErrorContext();

  return (
    <div className="error">
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

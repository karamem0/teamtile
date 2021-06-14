//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { WarningIcon } from '@fluentui/react-icons-mdl2';
import AppContext from '../contexts/AppContext';

const ErrorBar: React.FC = () => {

  const [ , , error, setError ] = React.useContext(AppContext);

  return (
    <div className="error">
      <Alert
        content={error}
        dismissible
        icon={
          <WarningIcon />
        }
        variables={{ urgent: true }}
        onVisibleChange={() => {
          if (!setError) {
            return;
          }
          setError(undefined);
        }} />
    </div>
  );

};

export default ErrorBar;

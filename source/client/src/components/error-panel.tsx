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
import { ErrorBadgeIcon } from '@fluentui/react-icons-mdl2';
import { Text } from '@fluentui/react-northstar';

export const ErrorPanel = (): React.ReactElement | null => {

  return (
    <div className="panel panel-center">
      <div className="center">
        <ErrorBadgeIcon className="panel-center-icon" />
        <Text
          className="panel-center-text"
          content="Something went wrong." />
      </div>
    </div>
  );

};

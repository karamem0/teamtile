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
import { Loader } from '@fluentui/react-northstar';

export const LoaderPanel = (): React.ReactElement | null => {

  return (
    <div className="panel panel-center">
      <Loader label="Loading..." />
    </div>
  );

};

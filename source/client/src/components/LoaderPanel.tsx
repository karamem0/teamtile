//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Loader } from '@fluentui/react-northstar';

const LoaderPanel: React.FC = () => {

  return (
    <div className="panel panel-center">
      <Loader label="Loading..." />
    </div>
  );

};

export default LoaderPanel;

//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducer } from '../../../providers/ReducerProvider';

import Presenter from './EmptyPanel.presenter';

function EmptyPanel() {

  const { dispatchers } = useReducer();

  const handleClick = React.useCallback(() => {
    dispatchers.setLoading(true);
  }, [ dispatchers ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default EmptyPanel;

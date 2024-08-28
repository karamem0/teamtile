//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './EmptyPanel.presenter';
import { useReducer } from '../../../providers/ReducerProvider';

function EmptyPanel() {

  const { dispatchers } = useReducer();

  const handleClick = React.useCallback(() => {
    dispatchers.setLoading(true);
  }, [
    dispatchers
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default EmptyPanel;

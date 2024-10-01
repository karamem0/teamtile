//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './EmptyPanel.presenter';
import { setLoading } from '../../../stores/Action';
import { useStore } from '../../../providers/StoreProvider';

function EmptyPanel() {

  const { dispatch } = useStore();

  const handleClick = React.useCallback(() => {
    dispatch(setLoading(true));
  }, [
    dispatch
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default EmptyPanel;

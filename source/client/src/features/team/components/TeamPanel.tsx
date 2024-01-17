//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useDebounce } from 'react-use';

import { useReducer } from '../../../providers/ReducerProvider';
import { Event } from '../../../types/Event';
import { clearCache } from '../managers/TeamManager';

import Presenter from './TeamPanel.presenter';

function TeamPanel() {

  const {
    dispatchers
  } = useReducer();

  const [ filter, setFilter ] = React.useState<string>();

  useDebounce(() => {
    dispatchers.setFilter(filter);
  }, 500, [
    dispatchers,
    filter
  ]);

  const handleFilterChange = React.useCallback((_?: Event, data?: string) => {
    setFilter(data);
  }, []);

  const handleRefreshClick = React.useCallback(async (e?: Event) => {
    if ((e as React.KeyboardEvent)?.shiftKey) {
      await clearCache();
    }
    dispatchers.setLoading(true);
  }, [ dispatchers ]);

  return (
    <Presenter
      onFilterChange={handleFilterChange}
      onRefreshClick={handleRefreshClick} />
  );

}

export default TeamPanel;

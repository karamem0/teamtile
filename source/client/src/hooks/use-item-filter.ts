//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useDebounce } from 'react-use';

import { useReducerContext } from '../contexts/reducer-context';

interface ItemFilterValue {
  filter: string | null | undefined,
  setFilter: (filter: string) => void
}

export const useItemFilter = (): ItemFilterValue => {

  const { state, dispatchers } = useReducerContext();
  const [ filter, setFilter ] = React.useState(state.itemFilter);

  useDebounce(() => {
    dispatchers.dispatchFilter(filter || null);
  }, 500, [
    filter,
    dispatchers
  ]);

  return {
    filter,
    setFilter
  };

};

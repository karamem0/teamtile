//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Hooks
import { useDebounce } from 'react-use';
// Reducers
import { putFilter } from '../reducers/action';

export const useFilter = (): [ (filter?: string) => void ] => {

  const { dispatch } = useReducerContext();
  const [ filter, setFilter ] = React.useState<string>();

  useDebounce(() => {
    if (!dispatch) {
      return;
    }
    dispatch(putFilter(filter));
  }, 500, [ dispatch, filter ]);

  const dispatchFilter = React.useCallback((filter?: string) => {
    setFilter(filter);
  }, [ ]);

  return [
    dispatchFilter
  ];

};

//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useAsyncFn, useError } from 'react-use';

import { useReducer } from '../../../providers/ReducerProvider';
import { getItems } from '../managers/TeamManager';

import Presenter from './TeamPage.presenter';

function TeamPage() {

  const dispatchError = useError();
  const {
    dispatchers,
    state: {
      items,
      loading
    }
  } = useReducer();
  const [ state, fetch ] = useAsyncFn(() => getItems());

  React.useEffect(() => {
    (async () => {
      if (loading) {
        dispatchers.setItems(await fetch());
      }
    })();
  }, [
    dispatchers,
    fetch,
    loading
  ]);

  React.useEffect(() => {
    if (!state.error) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

  React.useEffect(() => {
    dispatchers.setLoading(state.loading);
  }, [
    dispatchers,
    state.loading
  ]);

  React.useEffect(() => {
    dispatchers.setLoading(true);
  }, [
    dispatchers
  ]);

  return (
    <Presenter
      items={items}
      loading={loading} />
  );

}

export default TeamPage;

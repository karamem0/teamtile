//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { setCards, setLoading } from '../../../stores/Action';
import { useAsyncFn, useError } from 'react-use';
import { getCards } from '../managers/TeamManager';
import { useStore } from '../../../providers/StoreProvider';

import Presenter from './TeamPage.presenter';

function TeamPage() {

  const dispatchError = useError();
  const {
    dispatch,
    state: {
      cards,
      loading
    }
  } = useStore();
  const [ state, fetch ] = useAsyncFn(() => getCards());

  React.useEffect(() => {
    (async () => {
      if (loading) {
        dispatch(setCards(await fetch()));
      }
    })();
  }, [
    loading,
    dispatch,
    fetch
  ]);

  React.useEffect(() => {
    if (state.error == null) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

  React.useEffect(() => {
    dispatch(setLoading(state.loading));
  }, [
    dispatch,
    state.loading
  ]);

  React.useEffect(() => {
    dispatch(setLoading(true));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      cards={cards}
      loading={loading} />
  );

}

export default TeamPage;

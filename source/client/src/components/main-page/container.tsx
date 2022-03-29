//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducerContext } from '../../contexts/reducer-context';
import { useClient } from '../../hooks/use-client';
import { useItemLoader } from '../../hooks/use-item-loader';

import Presenter from './presenter';

export default function MainPage (): React.ReactElement | null {

  const { state } = useReducerContext();
  const [ , error ] = useClient();
  const { loadItems } = useItemLoader();

  React.useEffect(() => {
    (async () => await loadItems(false))();
  }, [
    loadItems
  ]);

  return (
    <Presenter
      error={error}
      state={state} />
  );

}

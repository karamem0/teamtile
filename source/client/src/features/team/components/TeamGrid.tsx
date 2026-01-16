//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';

import Presenter from './TeamGrid.presenter';

function TeamGrid() {

  const { state } = useStore();

  return (
    <Presenter cards={state.cards} />
  );

}

export default TeamGrid;

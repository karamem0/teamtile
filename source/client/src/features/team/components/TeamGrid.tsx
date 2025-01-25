//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './TeamGrid.presenter';
import { useStore } from '../../../providers/StoreProvider';

function TeamGrid() {

  const { state } = useStore();

  return (
    <Presenter cards={state.cards} />
  );

}

export default TeamGrid;

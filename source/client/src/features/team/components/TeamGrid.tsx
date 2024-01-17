//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducer } from '../../../providers/ReducerProvider';

import Presenter from './TeamGrid.presenter';

function TeamGrid() {

  const { state } = useReducer();

  return (
    <Presenter items={state.items} />
  );

}

export default TeamGrid;

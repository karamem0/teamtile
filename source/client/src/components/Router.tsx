//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { inTeams } from '../utils/Teams';

import Presenter from './Router.presenter';

function Router() {

  return (
    <Presenter inTeams={inTeams()} />
  );

}

export default Router;

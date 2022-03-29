//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useErrorContext } from '../../contexts/error-context';
import { useInTeams } from '../../hooks/use-in-teams';

import Presenter from './presenter';

export default function Router (): React.ReactElement | null {

  const { error } = useErrorContext();
  const { inTeams } = useInTeams();

  return (
    <Presenter
      error={error}
      inTeams={inTeams} />
  );

}

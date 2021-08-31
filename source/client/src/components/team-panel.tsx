//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { useTeamIds } from '../hooks/use-team-ids';
import LoaderPanel from './loader-panel';
import EmptyPanel from './empty-panel';
import TeamCard from './team-card';

const TeamPanel = (): React.ReactElement => {

  const [ ids ] = useTeamIds();

  if (!ids) {
    return (
      <LoaderPanel />
    );
  }

  if (!ids.length) {
    return (
      <EmptyPanel />
    );
  }

  return (
    <div className="panel panel-grid">
      {
        ids.map((id) =>
          id && (
            <TeamCard
              id={id}
              key={id} />
          )
        )
      }
    </div>
  );

};

export default TeamPanel;

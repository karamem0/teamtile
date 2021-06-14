//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import useTeams from '../hooks/useTeams';
import LoaderPanel from './LoaderPanel';
import EmptyPanel from './EmptyPanel';
import TeamCard from './TeamCard';

const TeamPanel: React.FC = () => {

  const [ teams ] = useTeams();

  if (!teams) {
    return (
      <LoaderPanel />
    );
  }

  if (!teams.length) {
    return (
      <EmptyPanel />
    );
  }

  return (
    <div className="panel panel-grid">
      {
        teams.map((team) =>
          <TeamCard
            key={team.id}
            team={team} />
        )
      }
    </div>
  );

};

export default TeamPanel;

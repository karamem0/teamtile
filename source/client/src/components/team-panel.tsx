//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Components
import { TeamCard } from './team-card';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Hooks
import { useChannels } from '../hooks/use-channels';
import { useDrives } from '../hooks/use-drives';
import { useLoading } from '../hooks/use-loading';
import { useMembers } from '../hooks/use-members';
import { useTeamIcons } from '../hooks/use-team-icons';
import { useTeams } from '../hooks/use-teams';

export const TeamPanel = (): React.ReactElement | null => {

  const {
    loading,
    keys,
    values
  } = useReducerContext();
  const [ dispatchLoading ] = useLoading();
  const [ dispatchTeams ] = useTeams();
  const [ dispatchTeamIcons ] = useTeamIcons();
  const [ dispatchMembers ] = useMembers();
  const [ dispatchChannels ] = useChannels();
  const [ dispatchDrives ] = useDrives();

  React.useEffect(() => {
    if (!keys) {
      return;
    }
    (async () => {
      dispatchLoading(true);
      await Promise.all([
        dispatchTeams(keys),
        dispatchTeamIcons(keys),
        dispatchMembers(keys),
        dispatchChannels(keys),
        dispatchDrives(keys)
      ]);
      dispatchLoading(false);
    })();
  }, [
    keys,
    dispatchLoading,
    dispatchTeams,
    dispatchTeamIcons,
    dispatchMembers,
    dispatchChannels,
    dispatchDrives
  ]);

  if (!keys) {
    return null;
  }

  if (!values) {
    return null;
  }

  return (
    <div
      className="panel panel-grid"
      role="list">
      {
        keys.map((key, index) => (
          loading
            ? (
              <TeamCard
                item={{ key, value: undefined }}
                key={key} />
              )
            : (
              <TeamCard
                item={{ key, value: values[index] }}
                key={key} />
              )
        ))
      }
    </div>
  );

};

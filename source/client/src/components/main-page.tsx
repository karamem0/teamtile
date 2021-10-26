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
import { EmptyPanel } from './empty-panel';
import { ErrorPanel } from './error-panel';
import { LoaderPanel } from './loader-panel';
import { TeamFilter } from './team-filter';
import { TeamPanel } from './team-panel';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
import { useServiceContext } from '../contexts/service-context';
// Hooks
import { useChannels } from '../hooks/use-channels';
import { useDrives } from '../hooks/use-drives';
import { useKeys } from '../hooks/use-keys';
import { useLoading } from '../hooks/use-loading';
import { useMembers } from '../hooks/use-members';
import { useTeamIcons } from '../hooks/use-team-icons';
import { useTeams } from '../hooks/use-teams';

export const MainPage = (): React.ReactElement | null => {

  const { error } = useServiceContext();
  const { store } = useReducerContext();
  const [ dispatchKeys ] = useKeys();
  const [ dispatchLoading ] = useLoading();
  const [ dispatchTeams ] = useTeams();
  const [ dispatchTeamIcons ] = useTeamIcons();
  const [ dispatchMembers ] = useMembers();
  const [ dispatchChannels ] = useChannels();
  const [ dispatchDrives ] = useDrives();

  const keys = store?.keys;
  const values = store?.values;

  React.useEffect(() => {
    (async () => {
      await dispatchKeys();
    })();
  }, [ dispatchKeys ]);

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

  if (error) {
    return (
      <ErrorPanel />
    );
  }

  if (!keys) {
    return (
      <LoaderPanel />
    );
  }

  if (!keys.length) {
    return (
      <EmptyPanel />
    );
  }

  if (!values) {
    return (
      <LoaderPanel />
    );
  }

  if (!values.some(Boolean)) {
    return (
      <LoaderPanel />
    );
  }

  if (!values.some(value => value.enabled)) {
    return (
      <TeamFilter>
        <EmptyPanel />
      </TeamFilter>
    );
  }

  return (
    <TeamFilter>
      <TeamPanel />
    </TeamFilter>
  );

};

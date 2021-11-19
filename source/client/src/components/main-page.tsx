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
// Types
import { ItemKey } from '../types/reducer';

export const MainPage = (): React.ReactElement | null => {

  const { error } = useServiceContext();
  const { state } = useReducerContext();
  const [ dispatchLoading ] = useLoading();
  const [ getKeys, dispatchKeys ] = useKeys();
  const [ getTeams, dispatchTeams ] = useTeams();
  const [ getTeamIcons, dispatchTeamIcons ] = useTeamIcons();
  const [ getMembers, dispatchMembers ] = useMembers();
  const [ getChannels, dispatchChannels ] = useChannels();
  const [ getDrives, dispatchDrives ] = useDrives();

  const putTeams = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getTeams(keys);
    if (!values) {
      return;
    }
    await dispatchTeams(values);
  }, [
    getTeams,
    dispatchTeams
  ]);

  const putTeamIcons = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getTeamIcons(keys);
    if (!values) {
      return;
    }
    await dispatchTeamIcons(values);
  }, [
    getTeamIcons,
    dispatchTeamIcons
  ]);

  const putChannels = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getChannels(keys);
    if (!values) {
      return;
    }
    await dispatchChannels(values);
  }, [
    getChannels,
    dispatchChannels
  ]);

  const putMembers = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getMembers(keys);
    if (!values) {
      return;
    }
    await dispatchMembers(values);
  }, [
    getMembers,
    dispatchMembers
  ]);

  const putDrives = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getDrives(keys);
    if (!values) {
      return;
    }
    await dispatchDrives(values);
  }, [
    getDrives,
    dispatchDrives
  ]);

  React.useEffect(() => {
    (async () => {
      dispatchLoading(true);
      const keys = await getKeys();
      if (!keys) {
        return;
      }
      await dispatchKeys(keys);
      await Promise.all([
        putTeams(keys),
        putTeamIcons(keys),
        putChannels(keys),
        putMembers(keys),
        putDrives(keys)
      ]);
      dispatchLoading(false);
    })();
  }, [
    dispatchLoading,
    getKeys,
    dispatchKeys,
    putTeams,
    putTeamIcons,
    putMembers,
    putChannels,
    putDrives
  ]);

  if (error) {
    return (
      <ErrorPanel />
    );
  }

  if (!state) {
    return (
      <LoaderPanel />
    );
  }

  if (!state.items.some((item) => Boolean(item.value))) {
    return (
      <LoaderPanel />
    );
  }

  if (!state.items.some((item) => item.visible)) {
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

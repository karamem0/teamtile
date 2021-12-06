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
import { useErrorContext } from '../contexts/error-context';
import { useReducerContext } from '../contexts/reducer-context';
// Hooks
import { useChannels } from '../hooks/use-channels';
import { useClient } from '../hooks/use-client';
import { useDrives } from '../hooks/use-drives';
import { useKeys } from '../hooks/use-keys';
import { useMembers } from '../hooks/use-members';
import { useTeamIcons } from '../hooks/use-team-icons';
import { useTeams } from '../hooks/use-teams';
// Types
import { ItemKey } from '../types/state';

export const MainPage = (): React.ReactElement | null => {

  const { setError } = useErrorContext();
  const [ , error ] = useClient();
  const {
    state,
    dispatchChannels,
    dispatchDrives,
    dispatchKeys,
    dispatchLoading,
    dispatchMembers,
    dispatchTeamIcons,
    dispatchTeams
  } = useReducerContext();
  const [ getKeys ] = useKeys();
  const [ getTeams ] = useTeams();
  const [ getTeamIcons ] = useTeamIcons();
  const [ getMembers ] = useMembers();
  const [ getChannels ] = useChannels();
  const [ getDrives ] = useDrives();

  const setTeams = React.useCallback(async (keys: ItemKey[]) => {
    const values = await getTeams(keys);
    if (!values) {
      return;
    }
    dispatchTeams(values);
  }, [
    getTeams,
    dispatchTeams
  ]);

  const setTeamIcons = React.useCallback(async (keys: ItemKey[]) => {
    dispatchTeamIcons(await getTeamIcons(keys));
  }, [
    getTeamIcons,
    dispatchTeamIcons
  ]);

  const setChannels = React.useCallback(async (keys: ItemKey[]) => {
    dispatchChannels(await getChannels(keys));
  }, [
    getChannels,
    dispatchChannels
  ]);

  const setMembers = React.useCallback(async (keys: ItemKey[]) => {
    dispatchMembers(await getMembers(keys));
  }, [
    getMembers,
    dispatchMembers
  ]);

  const setDrives = React.useCallback(async (keys: ItemKey[]) => {
    dispatchDrives(await getDrives(keys));
  }, [
    getDrives,
    dispatchDrives
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        dispatchLoading(true);
        const keys = await getKeys();
        if (!keys) {
          return;
        }
        dispatchKeys(keys);
        await Promise.all([
          setTeams(keys),
          setTeamIcons(keys),
          setChannels(keys),
          setMembers(keys),
          setDrives(keys)
        ]);
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        setError(message);
      } finally {
        dispatchLoading(false);
      }
    })();
  }, [
    setError,
    dispatchLoading,
    getKeys,
    dispatchKeys,
    setTeams,
    setTeamIcons,
    setMembers,
    setChannels,
    setDrives
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

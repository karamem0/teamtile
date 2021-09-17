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
import { TeamPanel } from './team-panel';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
import { useServiceContext } from '../contexts/service-context';
// Hooks
import { useKeys } from '../hooks/use-keys';

export const MainPage = (): React.ReactElement | null => {

  const { error } = useServiceContext();
  const { keys } = useReducerContext();
  const [ dispatchKeys ] = useKeys();

  React.useEffect(() => {
    (async () => await dispatchKeys())();
  }, [ dispatchKeys ]);

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

  return (
    <TeamPanel />
  );

};

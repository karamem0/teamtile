//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducerContext } from '../contexts/reducer-context';
import { useClient } from '../hooks/use-client';
import { useItemLoader } from '../hooks/use-item-loader';
import { Loading } from '../types/state';

import { EmptyPanel } from './empty-panel';
import { ErrorPanel } from './error-panel';
import { LoaderPanel } from './loader-panel';
import { TeamContent } from './team-content';
import { TeamNotFoundContent } from './team-not-found-content';
import { TeamPanel } from './team-panel';
import { TeamSkeletonContent } from './team-skeleton-content';

export const MainPage = (): React.ReactElement | null => {

  const { state } = useReducerContext();
  const [ , error ] = useClient();
  const { loadItems } = useItemLoader();

  React.useEffect(() => {
    loadItems();
  }, [
    loadItems
  ]);

  if (error) {
    return (
      <ErrorPanel />
    );
  }

  switch (state.loading) {
    case Loading.none:
    case Loading.keys: {
      return (
        <LoaderPanel />
      );
    }
    case Loading.values: {
      return (
        <TeamPanel>
          <TeamSkeletonContent />
        </TeamPanel>
      );
    }
    default: {
      if (!state.items.length) {
        return (
          <EmptyPanel onClick={loadItems} />
        );
      }
      if (!state.items.some((item) => item.visible)) {
        return (
          <TeamPanel>
            <TeamNotFoundContent />
          </TeamPanel>
        );
      }
      return (
        <TeamPanel>
          <TeamContent />
        </TeamPanel>
      );
    }
  }

};

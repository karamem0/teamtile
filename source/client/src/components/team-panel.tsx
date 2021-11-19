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
import { TeamCardSkeleton } from './team-card-skeleton';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';

export const TeamPanel = (): React.ReactElement | null => {

  const { state } = useReducerContext();

  if (!state) {
    return null;
  }

  const { loading, items } = state;

  return (
    <div
      className="panel panel-grid"
      role="list">
      {
        items.map((item) => (
          loading
            ? (
              <TeamCardSkeleton key={item.key} />
              )
            : (
              <TeamCard
                item={item}
                key={item.key} />
              )
        ))
      }
    </div>
  );

};

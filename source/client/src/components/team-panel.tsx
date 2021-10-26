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

  const { loading, store } = useReducerContext();

  const keys = store?.keys;

  if (!keys) {
    return null;
  }

  return (
    <div
      className="panel panel-grid"
      role="list">
      {
        keys.map((_, index) => (
          loading
            ? (
              <TeamCardSkeleton key={index} />
              )
            : (
              <TeamCard
                index={index}
                key={index} />
              )
        ))
      }
    </div>
  );

};

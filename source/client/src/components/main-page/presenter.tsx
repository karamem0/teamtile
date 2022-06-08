//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { State } from '../../types/state';
import { EmptyPanel } from '../empty-panel';
import { ErrorPanel } from '../error-panel';
import { LoaderPanel } from '../loader-panel';
import { TeamContent } from '../team-content';
import { TeamNotFound } from '../team-not-found';
import { TeamPanel } from '../team-panel';

interface MainPageProps {
  error: string | null,
  state: State
}

export default React.memo(function MainPage ({
  error,
  state
}: MainPageProps): React.ReactElement | null {

  if (error) {
    return (
      <ErrorPanel error={error} />
    );
  }

  switch (state.loading) {
    case true:
      return (
        <LoaderPanel />
      );
    case false: {
      if (!state.items.length) {
        return (
          <EmptyPanel />
        );
      }
      if (!state.items.some((item) => item.visible)) {
        return (
          <TeamPanel>
            <TeamNotFound />
          </TeamPanel>
        );
      }
      return (
        <TeamPanel>
          <TeamContent />
        </TeamPanel>
      );
    }
    default:
      return (
        <ErrorPanel error="" />
      );
  }

});

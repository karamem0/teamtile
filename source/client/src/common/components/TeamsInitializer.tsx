//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import Presenter from './TeamsInitializer.presenter';

interface TeamsInitializerProps {
  children?: (inTeams?: boolean) => React.ReactNode
}

function TeamsInitializer(props: Readonly<TeamsInitializerProps>) {

  const { children } = props;

  const [ inTeams, setInTeams ] = React.useState<boolean>();
  const [ loading, setLoading ] = React.useState<boolean>();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await app.initialize();
        setInTeams(true);
      } catch {
        setInTeams(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Presenter loading={loading}>
      {inTeams == null ? null : children?.(inTeams)}
    </Presenter>
  );

}

export default TeamsInitializer;

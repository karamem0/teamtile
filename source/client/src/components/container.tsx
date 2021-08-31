//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { useAppContext } from '../contexts/app-context';
import { useClient } from '../hooks/use-client';
import LoaderPanel from './loader-panel';
import ErrorPanel from './error-panel';
import TeamPanel from './team-panel';

const Container = (): React.ReactElement => {

  const { setClient } = useAppContext();
  const [ client, error ] = useClient();

  React.useEffect(() => {
    if (!setClient) {
      return;
    }
    setClient(client);
  }, [ setClient, client ]);

  if (error) {
    return (
      <ErrorPanel />
    );
  }

  if (!client) {
    return (
      <LoaderPanel />
    );
  }

  return (
    <TeamPanel />
  );

};

export default Container;

//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import AppContext from '../contexts/AppContext';
import useGraph from '../hooks/useClient';
import LoaderPanel from './LoaderPanel';
import ErrorPanel from './ErrorPanel';
import TeamPanel from './TeamPanel';

const Container: React.FC = () => {

  const [ , setClient ] = React.useContext(AppContext);
  const [ client, error ] = useGraph();

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

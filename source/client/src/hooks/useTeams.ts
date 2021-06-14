//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';
import { Team } from '../types';
import AppContext from '../contexts/AppContext';

const useTeams = (): [ Team[] | undefined ] => {

  const [ client, , , setError ] = React.useContext(AppContext);
  const [ teams, setTeams ] = React.useState<Team[]>();

  React.useEffect(() => {
    if (!client) {
      return;
    }
    if (!setError) {
      return;
    }
    (async () => {
      try {
        const response = await client
          .api('/me/memberOf/microsoft.graph.group')
          .header('ConsistencyLevel', 'eventual')
          .version('beta')
          .count(true)
          .filter('resourceProvisioningOptions/any(x:x eq \'Team\')')
          .orderby('displayName')
          .get();
        const values = response.value as microsoftGraph.Group[];
        setTeams(values.map((value) => ({
          id: value.id ?? undefined,
          name: value.displayName ?? undefined,
          description: value.description ?? undefined
        })));
      } catch (e) {
        console.error(e);
        setTeams([]);
        setError(e.toString());
      }
    })();
  }, [ client, setError ]);

  return [
    teams
  ];

};

export default useTeams;

//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';
import { useAppContext } from '../contexts/app-context';

const useTeamIds = (): [ (string | undefined)[] | undefined ] => {

  const { client, setError } = useAppContext();
  const [ ids, setIds ] = React.useState<(string | undefined)[]>();

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
          .select('id')
          .filter('resourceProvisioningOptions/any(x:x eq \'Team\')')
          .orderby('displayName')
          .get();
        const values = response.value as microsoftGraph.Group[];
        setIds(values.map((value) => value.id));
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        console.error(message);
        setError(message);
        setIds([]);
      }
    })();
  }, [ client, setError ]);

  return [
    ids
  ];

};

export { useTeamIds };

import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface TeamsProps {
  token?: string;
}

interface TeamsResult {
  id?: string;
  name?: string;
  description?: string;
}

const useTeams = (props: TeamsProps): [TeamsResult[] | undefined, string | undefined] => {

  const { token } = props;
  const [ teams, setTeams ] = React.useState<TeamsResult[]>();
  const [ error, setError ] = React.useState<string>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          'https://graph.microsoft.com/beta/me/memberOf/microsoft.graph.group' +
        '?$count=true' +
        '&$filter=resourceProvisioningOptions/any(x:x eq \'Team\')' +
        '&$orderby=displayName',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              ConsistencyLevel: 'eventual'
            },
            method: 'GET',
            mode: 'cors'
          }
        );
        if (response.ok) {
          const json = await response.json();
          const values = json.value as microsoftGraph.Group[];
          setTeams(values.map(value => ({
            id: value.id ?? undefined,
            name: value.displayName ?? undefined,
            description: value.description ?? undefined
          })));
        } else {
          const json = await response.json();
          const value = json.error as microsoftGraph.GenericError;
          if (value.message) {
            setTeams([]);
            setError(value.message);
          }
        }
      } catch (e) {
        setTeams([]);
        setError(e.toString());
      }
    })();
  }, [ token ]);

  return [
    teams,
    error
  ];

};

export default useTeams;

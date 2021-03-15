import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface TeamProps {
  token?: string;
  id?: string;
}

interface TeamResult {
  id?: string;
  visibility?: string;
  url?: string;
}

const useTeam = (props: TeamProps): [TeamResult | undefined] => {

  const { token, id } = props;
  const [ team, setTeam ] = React.useState<TeamResult>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/beta/teams/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET',
          mode: 'cors'
        }
      );
      if (response.ok) {
        const json = await response.json();
        const value = json as microsoftGraph.Team;
        setTeam({
          id: value.id ?? undefined,
          visibility: value.visibility ?? undefined,
          url: value.webUrl ?? undefined
        });
      }
    })();
  }, [ token, id ]);

  return [ team ];

};

export default useTeam;

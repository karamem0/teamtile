import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface TeamChannelsProps {
  token?: string;
  id?: string;
}

interface TeamChannelResult {
  id?: string;
  name?: string;
  url?: string;
}

const useTeamChannels = (props: TeamChannelsProps): [TeamChannelResult[] | undefined] => {

  const { token, id } = props;
  const [ channels, setChannels ] = React.useState<TeamChannelResult[]>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/beta/teams/${id}/channels`,
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
        const values = json.value as microsoftGraph.Channel[];
        setChannels(values.map(value => (
          {
            id: value.id ?? undefined,
            name: value.displayName ?? undefined,
            url: value.webUrl ?? undefined
          })));
      }
    })();
  }, [ token, id ]);

  return [ channels ];

};

export default useTeamChannels;

import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface GroupDriveProps {
  token?: string;
  id?: string;
}

interface GroupDriveResult {
  id?: string;
  url?: string;
}

const useGroupDrive = (props: GroupDriveProps): [GroupDriveResult | undefined] => {

  const { token, id } = props;
  const [ drive, setDrive ] = React.useState<GroupDriveResult>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/beta/groups/${id}/drive`,
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
        const value = json as microsoftGraph.Drive;
        setDrive({
          id: value.id ?? undefined,
          url: value.webUrl ?? undefined
        });
      }
    })();
  }, [ token ]);

  return [ drive ];

};

export default useGroupDrive;

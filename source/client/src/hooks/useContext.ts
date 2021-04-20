import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

const useContext = (): [ microsoftTeams.Context | undefined ] => {

  const [ context, setContext ] = React.useState<microsoftTeams.Context>();

  React.useEffect(() => {
    microsoftTeams.initialize(() => {
      microsoftTeams.getContext((value) => {
        setContext(value);
      });
    });
  }, []);

  return [ context ];

};

export default useContext;

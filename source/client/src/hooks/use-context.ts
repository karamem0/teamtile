//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

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

export { useContext };

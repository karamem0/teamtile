//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

interface InTeamsValue {
  inTeams: boolean | null
}

export const useInTeams = (): InTeamsValue => {

  const [ inTeams, setInTeams ] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (window.name === 'embedded-page-container' ||
        window.name === 'extension-tab-frame') {
      setInTeams(true);
    } else {
      setInTeams(false);
    }
  }, []);

  return {
    inTeams
  };

};

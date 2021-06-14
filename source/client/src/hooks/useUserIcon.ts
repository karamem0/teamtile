//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import AppContext from '../contexts/AppContext';

interface UserIconProps {
  id?: string;
}

const useUserIcon = (props: UserIconProps): [ string | undefined ] => {

  const [ client ] = React.useContext(AppContext);
  const { id } = props;
  const [ icon, setIcon ] = React.useState<string>();

  React.useEffect(() => {
    if (!client) {
      return;
    }
    if (!id) {
      return;
    }
    (async () => {
      try {
        const blob = await client
          .api(`/users/${id}/photo/$value`)
          .get();
        setIcon((value) => {
          if (value) {
            window.URL.revokeObjectURL(value);
          }
          return window.URL.createObjectURL(blob);
        });
      } catch (e) {
        console.info(e);
      }
    })();
  },
  [ client, id ]);

  return [ icon ];

};

export default useUserIcon;

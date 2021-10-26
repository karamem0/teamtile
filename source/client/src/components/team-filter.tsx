//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-mdl2';
// Hooks
import { useFilter } from '../hooks/use-filter';

export interface MenuItemFilterProps {
  children?: React.ReactNode
}

export const TeamFilter = ({ children }: MenuItemFilterProps): React.ReactElement | null => {

  const [ dispatchFilter ] = useFilter();

  const handleChange = React.useCallback((filter?: string) => {
    const handle = setTimeout(() => {
      dispatchFilter(filter);
    }, 500);
    return () => clearTimeout(handle);
  }, [ dispatchFilter ]);

  return (
    <div className="panel">
      <div className="team-filter">
        <Input
          className="team-filter-phrase"
          clearable
          fluid
          icon={<SearchIcon />}
          onChange={(_, props) => handleChange(props?.value)} />
        <div className="team-filter-content">
          {children}
        </div>
      </div>
    </div>
  );

};

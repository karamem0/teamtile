//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
import { useDebounce } from 'react-use';
// Fluent UI
import { Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-mdl2';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';

export interface MenuItemFilterProps {
  children?: React.ReactNode
}

export const TeamFilter = ({ children }: MenuItemFilterProps): React.ReactElement | null => {

  const [ filter, setFilter ] = React.useState<string | null>(null);
  const { dispatchFilter } = useReducerContext();

  useDebounce(() => {
    dispatchFilter(filter);
  }, 500, [
    filter,
    dispatchFilter
  ]);

  const handleChange = React.useCallback((filter: string | null) => {
    setFilter(filter);
  }, []);

  return (
    <div className="panel">
      <div className="team-filter">
        <Input
          className="team-filter-phrase"
          clearable
          fluid
          icon={<SearchIcon />}
          onChange={(_, props) => handleChange(props ? props.value : null)} />
        <div className="team-filter-content">
          {children}
        </div>
      </div>
    </div>
  );

};

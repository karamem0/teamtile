//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Hooks
import { useDebounce } from 'react-use';
// Fluent UI
import { Channel } from '../types/entity';
import { Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-mdl2';

export interface ChannelMenuItemFilterProps {
  renderer: (values: Channel[]) => React.ReactNode,
  values: Channel[]
}

export const ChannelMenuItemFilter = ({ renderer, values }: ChannelMenuItemFilterProps): React.ReactElement | null => {

  const [ results, setResults ] = React.useState(values);
  const [ filter, setFilter ] = React.useState<string | null>(null);

  useDebounce(() => {
    if (!filter) {
      setResults(values);
      return;
    }
    setResults(values.filter((value) => {
      if (value.displayName) {
        if (value.displayName.search(new RegExp(filter, 'i')) >= 0) {
          return true;
        }
      }
      return false;
    }));
  }, 500, [
    values,
    filter
  ]);

  const handleChange = React.useCallback((filter: string | null) => {
    setFilter(filter);
  }, []);

  return (
    <div className="menu-item-filter">
      <Input
        className="menu-item-filter-phrase"
        clearable
        fluid
        icon={<SearchIcon />}
        onChange={(_, props) => handleChange(props ? props.value : null)} />
      <div className="menu-item-filter-content">
        {renderer(results)}
      </div>
    </div>
  );

};

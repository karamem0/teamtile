//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

/* eslint-disable @typescript-eslint/no-explicit-any */

// React
import React from 'react';
// Fluent UI
import { Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-mdl2';

export interface MenuItemFilterProps {
  renderer: (values: any[]) => React.ReactNode,
  values: any[]
}

export const MenuItemFilter = ({ renderer, values }: MenuItemFilterProps): React.ReactElement | null => {

  const [ filter, setFilter ] = React.useState(values);

  const handleChange = React.useCallback((filter?: string) => {
    const handle = setTimeout(() => {
      if (!filter) {
        setFilter(values);
        return;
      }
      setFilter(values.filter((item) => {
        const pair = item as { [ key: string ]: any };
        for (const key in pair) {
          const value = pair[key];
          if (typeof value === 'string') {
            if (value.search(new RegExp(filter, 'i')) >= 0) {
              return true;
            }
          }
        }
        return false;
      }));
    }, 500);
    return () => clearTimeout(handle);
  }, [ values ]);

  return (
    <div className="menu-item-filter">
      <Input
        className="menu-item-filter-phrase"
        clearable
        fluid
        icon={<SearchIcon />}
        onChange={(_, props) => handleChange(props?.value)} />
      <div className="menu-item-filter-content">
        {renderer(filter)}
      </div>
    </div>
  );

};

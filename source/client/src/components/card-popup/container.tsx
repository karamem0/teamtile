//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useDebounce } from 'react-use';

import { InputProps, PopupProps } from '@fluentui/react-northstar';

import { EventHandler } from '../../types/common';

import Presenter from './presenter';

interface CardPopupProps<T> {
  items: T[],
  predicate: (filter: string, item: T) => boolean,
  renderer: (items: T[]) => React.ReactNode,
  trigger: React.ReactElement,
  onOpenChange?: EventHandler<PopupProps>
}

export default function CardPopup <T> ({
  items,
  renderer,
  predicate,
  trigger,
  onOpenChange
}: CardPopupProps<T>): React.ReactElement | null {

  const [ filterItems, setFilterItems ] = React.useState(items);
  const [ filter, setFilter ] = React.useState<string | null>(null);

  useDebounce(() => {
    if (!filter) {
      setFilterItems(items);
    } else {
      setFilterItems(items.filter((item) => predicate(filter, item)));
    }
  }, 500, [
    items,
    filter
  ]);

  const handleInputChange = React.useCallback((_, data?: InputProps & { value: string } | undefined) => {
    setFilter(data?.value || null);
  }, []);

  return (
    <Presenter
      items={filterItems}
      renderer={renderer}
      trigger={trigger}
      onInputChange={handleInputChange}
      onOpenChange={onOpenChange} />
  );

}

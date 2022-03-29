//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { InputProps } from '@fluentui/react-northstar';

import { useItemFilter } from '../../hooks/use-item-filter';
import { useItemLoader } from '../../hooks/use-item-loader';

import Presenter from './presenter';

interface TeamPanelProps {
  children?: React.ReactNode
}

export default function TeamPanel ({
  children
}: TeamPanelProps): React.ReactElement | null {

  const { filter, setFilter } = useItemFilter();
  const { loadItems } = useItemLoader();

  const handleInputChange = React.useCallback((_, data: InputProps & { value: string } | undefined) => {
    setFilter(data?.value);
  }, [
    setFilter
  ]);

  const handleButtonClick = React.useCallback(async (event: React.SyntheticEvent) => {
    await loadItems((event as React.KeyboardEvent).shiftKey);
  }, [
    loadItems
  ]);

  return (
    <Presenter
      filter={filter}
      onButtonClick={handleButtonClick}
      onInputChange={handleInputChange}>
      {children}
    </Presenter>
  );

}

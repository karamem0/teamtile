//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useItemLoader } from '../../hooks/use-item-loader';

import Presenter from './presenter';

export default function EmptyPanel (): React.ReactElement | null {

  const { loadItems } = useItemLoader();

  const handleClick = React.useCallback(async () => {
    await loadItems(false);
  }, [
    loadItems
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

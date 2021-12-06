//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Contexts
import { useServiceContext } from '../contexts/service-context';
// Types
import { ItemKey } from '../types/state';

export const useKeys = (): [
  () => Promise<ItemKey[]>
] => {

  const { services } = useServiceContext();

  const getKeys = React.useCallback(async () => {
    return await services.graph.getKeys();
  }, [
    services
  ]);

  return [
    getKeys
  ];

};

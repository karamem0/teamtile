//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import createMerge from '@fastify/deepmerge';
import { Member } from '../types/Entity';
import { TeamCard } from '../types/Store';

export const merge = createMerge({
  symbols: true
});

export function mergeCards(source: TeamCard[], target: TeamCard[]) {
  const items = [ ...source ];
  source.forEach((sourceItem, sourceIndex) => {
    const targetIndex = target.findIndex((targetItem) => targetItem.id === sourceItem.id);
    if (targetIndex >= 0) {
      const targetItem = target[targetIndex];
      if (targetItem != null) {
        items[sourceIndex] = merge(sourceItem, targetItem);
      }
    }
  });
  return items;
}

export function mergeMembers(source: Member[], target: Member[]) {
  const items = [ ...source ];
  source.forEach((sourceItem, sourceIndex) => {
    const targetIndex = target.findIndex((targetItem) => targetItem.userId === sourceItem.userId);
    if (targetIndex >= 0) {
      const targetItem = target[targetIndex];
      if (targetItem != null) {
        items[sourceIndex] = merge(sourceItem, targetItem);
      }
    }
  });
  return items;
}

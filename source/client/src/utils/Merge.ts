//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import merge from 'deepmerge';
import { Member } from '../types/Entity';
import { TeamCard } from '../types/Store';

export function mergeCards(source: TeamCard[], target: TeamCard[], options?: merge.Options) {
  const items = [ ...source ];
  source.forEach((sourceItem, sourceIndex) => {
    const targetIndex = target.findIndex((targetItem) => targetItem.id === sourceItem.id);
    if (targetIndex >= 0) {
      items[sourceIndex] = merge(sourceItem, target[targetIndex], options);
    }
  });
  return items;
}

export function mergeMembers(source: Member[], target: Member[], options?: merge.Options) {
  const items = [ ...source ];
  source.forEach((sourceItem, sourceIndex) => {
    const targetIndex = target.findIndex((targetItem) => targetItem.userId === sourceItem.userId);
    if (targetIndex >= 0) {
      items[sourceIndex] = merge(sourceItem, target[targetIndex], options);
    }
  });
  return items;
}

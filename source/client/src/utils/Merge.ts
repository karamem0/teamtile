//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import merge from 'deepmerge';

import { Member } from '../types/Entity';
import { Item } from '../types/Store';

export function mergeItems(source: Item[], target: Item[], options?: merge.Options) {
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

//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Group, Team } from './Entity';

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  setFilter = 'setFilter',
  setItem = 'setItem',
  setItems = 'setItems',
  setLoading = 'setLoading'
}

export type DispatchAction<T> = (payload: T) => void;

export type Item = {
  id: string,
  loading?: boolean,
  pinned?: boolean,
  value: Group & Team,
  visible?: boolean
};

export interface State {
  filter?: string,
  items?: Item[],
  loading?: boolean
}

//
// Copyright (c) 2022 karamem0
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
  setItems = 'setItems',
  setLoading = 'setLoading'
}

export type DispatchAction<T> = (payload: T) => void;

export type Item = {
  id: string,
  value: Group & Team,
  loading?: boolean,
  visible?: boolean
};

export interface State {
  filter?: string,
  items?: Item[],
  loading?: boolean
}

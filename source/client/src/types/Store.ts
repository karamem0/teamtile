//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { VisibilityType } from './Entity';

export interface Action {
  type: ActionType,
  payload: unknown
}

export type ActionType =
  'setFilter' |
  'setCard' |
  'setCards' |
  'setLoading' |
  'togglePin';

export type DispatchAction<T> = (payload: T) => void;

export interface State {
  filter?: string,
  cards?: TeamCard[],
  loading?: boolean
}

export interface TeamCard {
  id: string,
  loading?: boolean,
  pinned?: boolean,
  team: TeamProps,
  visible?: boolean
}

export interface TeamProps {
  id: string,
  archived?: boolean,
  description?: string,
  displayName?: string,
  email?: string,
  icon?: string,
  internalId?: string,
  sensitivityLabel?: string,
  tenantId?: string,
  visibility?: VisibilityType,
  webUrl?: string
}

//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { VisibilityType } from './Entity';

export interface Action {
  payload: unknown,
  type: ActionType
}

export type ActionType =
  | 'setFilter'
  | 'setCard'
  | 'setCards'
  | 'setLoading'
  | 'togglePin';

export type DispatchAction<T> = (payload: T) => void;

export interface State {
  cards?: TeamCard[],
  filter?: string,
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
  archived?: boolean,
  description?: string,
  displayName?: string,
  email?: string,
  guestsCount?: number,
  icon?: string,
  id: string,
  internalId?: string,
  membersCount?: number,
  ownersCount?: number,
  sensitivityLabel?: string,
  tenantId?: string,
  visibility?: VisibilityType,
  webUrl?: string
}

//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  setLoading = 'setLoading',
  setFilter = 'setFilter',
  setKeys = 'setKeys',
  setTeams = 'setTeams',
  setTeamIcons = 'setTeamIcons',
  setChannels = 'setChannels',
  setMembers = 'setMembers',
  setMemberIcons = 'setMemberIcons',
  setDrives = 'setDrives',
}

export type DispatchAction<T> = (payload: T) => void;

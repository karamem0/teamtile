//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  setChannels = 'setChannels',
  setDrives = 'setDrives',
  setFilter = 'setFilter',
  setKeys = 'setKeys',
  setLoading = 'setLoading',
  setMemberIcons = 'setMemberIcons',
  setMembers = 'setMembers',
  setTeamIcons = 'setTeamIcons',
  setTeams = 'setTeams'
}

export type DispatchAction<T> = (payload: T) => void;

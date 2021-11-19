//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import {
  Action,
  ActionType,
  ItemKey
} from '../../types/reducer';

export const putTeamIcons = (payload: Map<ItemKey, string>): Action => ({
  type: ActionType.PutTeamIcons,
  payload: payload
});

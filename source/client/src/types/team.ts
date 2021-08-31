//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

export interface Team {
  id?: string,
  internalId?: string,
  name?: string,
  description?: string,
  visibility?: string,
  url?: string,
  icon?: {
    url?: string
  },
  channels?: {
    id?: string,
    count?: number,
    nextLink?: string,
    values?: {
      id?: string,
      name?: string,
      url?: string
    }[]
  },
  members?: {
    id?: string,
    count?: number,
    nextLink?: string,
    values?: {
      id?: string,
      name?: string,
      email?: string
    }[]
  },
  drive?: {
    id?: string,
    url?: string
  },
  timestamp?: number
}

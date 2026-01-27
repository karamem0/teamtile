//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export interface Entity {
  id: string
}

export interface ArrayEntity<T> {
  expired: number,
  id: string,
  values: T[]
}

export interface ValueEntity<T> {
  expired: number,
  id: string,
  value: T
}

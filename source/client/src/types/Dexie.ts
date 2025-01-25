//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export interface Entity {
  id: string
}

export interface ArrayEntity<T> {
  id: string,
  expired: number,
  values: T[]
}

export interface ValueEntity<T> {
  id: string,
  expired: number,
  value: T
}

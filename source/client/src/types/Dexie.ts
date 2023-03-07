//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

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

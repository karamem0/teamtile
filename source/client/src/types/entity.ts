//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

export interface Team {
  id?: string,
  displayName?: string,
  description?: string,
  internalId?: string,
  visibility?: VisibilityType,
  webUrl?: string
}

export interface Channel {
  id?: string,
  displayName?: string,
  webUrl?: string,
  membershipType?: MembershipType
}

export interface Member {
  id?: string,
  displayName?: string,
  userId?: string,
  email?: string
}

export interface Drive {
  id?: string,
  webUrl?: string
}

export interface Icon {
  icon?: string
}

export enum VisibilityType {
  Public = 'public',
  Private = 'private'
}

export enum MembershipType {
  Standard = 'standard',
  Private= 'private'
}

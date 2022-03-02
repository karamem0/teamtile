//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export interface Team {
  id: string | undefined,
  displayName: string | null | undefined,
  description: string | null | undefined,
  internalId: string | null | undefined,
  visibility: VisibilityType | null | undefined,
  webUrl: string | null | undefined
}

export interface Channel {
  id: string | undefined,
  displayName: string | null | undefined,
  webUrl: string | null | undefined,
  membershipType: MembershipType | null | undefined
}

export interface Member {
  id: string | undefined,
  displayName: string | null | undefined,
  userId: string | null | undefined,
  email: string | null | undefined
}

export interface Drive {
  id: string | undefined,
  webUrl: string | null | undefined
}

export interface Icon {
  icon: string | null | undefined
}

export enum VisibilityType {
  public = 'public',
  private = 'private'
}

export enum MembershipType {
  standard = 'standard',
  private= 'private'
}

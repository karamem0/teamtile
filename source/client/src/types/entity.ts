//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export interface Channel {
  displayName: string | null | undefined,
  id: string | undefined,
  membershipType: MembershipType | null | undefined,
  webUrl: string | null | undefined
}

export interface Group {
  id: string | undefined,
  mail: string | null | undefined,
  sensitivityLabel: string | null | undefined
}

export interface Drive {
  id: string | undefined,
  webUrl: string | null | undefined
}

export interface Icon {
  data: string | null | undefined,
  type: string | null | undefined
}

export interface Member {
  displayName: string | null | undefined,
  email: string | null | undefined,
  id: string | undefined,
  userId: string | null | undefined
}

export type MemberWithIcon = (
  Member & {
     icon: Icon | undefined
  }
)

export interface Tab {
  appId: string | null | undefined,
  displayName: string | null | undefined,
  id: string | undefined,
  webUrl: string | null | undefined
}

export interface Team {
  description: string | null | undefined,
  displayName: string | null | undefined,
  id: string | undefined,
  internalId: string | null | undefined,
  visibility: VisibilityType | null | undefined,
  webUrl: string | null | undefined
}

export type TeamWithMail = (
  Team & {
     mail: string | null | undefined
  }
)

export type TeamWithIcon = (
  Team & {
     icon: Icon | undefined
  }
)

export enum MembershipType {
  private = 'private',
  standard = 'standard'
}

export enum VisibilityType {
  private = 'private',
  public = 'public'
}

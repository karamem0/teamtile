//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export enum MembershipType {
  private = 'private',
  standard = 'standard'
}

export enum VisibilityType {
  private = 'private',
  public = 'public'
}

export enum AccordionType {
  all = 'all',
  archived = 'archived',
  pinned = 'pinned'
}

export interface Channel {
  id?: string,
  displayName?: string,
  membershipType?: MembershipType,
  webUrl?: string
}

export interface Drive {
  id?: string,
  webUrl?: string
}

export interface Group {
  id?: string,
  email?: string,
  sensitivityLabel?: string
}

export interface Icon {
  id?: string,
  data?: string
}

export interface Member {
  id?: string,
  displayName?: string,
  email?: string,
  icon?: string,
  userId?: string
}

export interface Tab {
  id?: string,
  appId?: string,
  displayName?: string,
  webUrl?: string
}

export interface Team {
  id?: string,
  archived?: boolean,
  description?: string,
  displayName?: string,
  icon?: string,
  internalId?: string,
  visibility?: VisibilityType,
  webUrl?: string
}

export interface TeamInfo {
  id?: string,
  displayName?: string,
  tenantId?: string
}

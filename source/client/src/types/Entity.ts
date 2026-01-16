//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export type MemberRoleType =
  | 'member'
  | 'owner';

export type MembershipType =
  | 'private'
  | 'standard'
  | 'shared';

export type VisibilityType =
  | 'private'
  | 'public';

export type AccordionType =
  | 'all'
  | 'archived'
  | 'pinned';

export interface Channel {
  id?: string,
  displayName?: string,
  membershipType?: MembershipType,
  primary?: boolean,
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
  role?: MemberRoleType,
  tenantId?: string,
  userId?: string
}

export interface Tab {
  id?: string,
  appId?: string,
  displayName?: string,
  webUrl?: string
}

export interface Tag {
  id?: string,
  description?: string,
  displayName?: string,
  memberCount?: number
}

export interface Team {
  id?: string,
  archived?: boolean,
  description?: string,
  displayName?: string,
  guestsCount?: number,
  icon?: string,
  internalId?: string,
  membersCount?: number,
  ownersCount?: number,
  visibility?: VisibilityType,
  webUrl?: string
}

export interface TeamInfo {
  id?: string,
  displayName?: string,
  tenantId?: string
}

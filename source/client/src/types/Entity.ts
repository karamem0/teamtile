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
  displayName?: string,
  id?: string,
  membershipType?: MembershipType,
  primary?: boolean,
  webUrl?: string
}

export interface Drive {
  id?: string,
  webUrl?: string
}

export interface Group {
  email?: string,
  id?: string,
  sensitivityLabel?: string
}

export interface Icon {
  data?: string,
  id?: string
}

export interface Member {
  displayName?: string,
  email?: string,
  icon?: string,
  id?: string,
  role?: MemberRoleType,
  tenantId?: string,
  userId?: string
}

export interface Tab {
  appId?: string,
  displayName?: string,
  id?: string,
  webUrl?: string
}

export interface Tag {
  description?: string,
  displayName?: string,
  id?: string,
  memberCount?: number
}

export interface Team {
  archived?: boolean,
  description?: string,
  displayName?: string,
  guestsCount?: number,
  icon?: string,
  id?: string,
  internalId?: string,
  membersCount?: number,
  ownersCount?: number,
  visibility?: VisibilityType,
  webUrl?: string
}

export interface TeamInfo {
  displayName?: string,
  id?: string,
  tenantId?: string
}

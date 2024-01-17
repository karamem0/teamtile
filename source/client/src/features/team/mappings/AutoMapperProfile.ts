//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  createMap,
  createMapper,
  forMember,
  ignore,
  mapFrom
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';

import {
  AadUserConversationMember as GraphMember,
  Channel as GraphChannel,
  Drive as GraphDrive,
  Group as GraphGroup,
  AssignedLabel as GraphLabel,
  Team as GraphTeam,
  TeamsTab as GraphTab,
  TeamsApp as GraphApp
} from '@microsoft/microsoft-graph-types';

import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  Tab,
  Team
} from '../../../types/Entity';
import { Item } from '../../../types/Store';

const mapper = createMapper({
  strategyInitializer: pojos()
});

PojosMetadataMap.create<Channel>('Channel', {
  id: String,
  displayName: String,
  membershipType: String,
  webUrl: String
});

PojosMetadataMap.create<Drive>('Drive', {
  id: String,
  webUrl: String
});

PojosMetadataMap.create<Group>('Group', {
  id: String,
  email: String,
  sensitivityLabel: String
});

PojosMetadataMap.create<Icon>('Icon', {
  data: String,
  id: String
});

PojosMetadataMap.create<Member>('Member', {
  id: String,
  displayName: String,
  email: String,
  userId: String
});

PojosMetadataMap.create<Tab>('Tab', {
  id: String,
  appId: String,
  displayName: String,
  webUrl: String
});

PojosMetadataMap.create<Team>('Team', {
  id: String,
  archived: Boolean,
  description: String,
  displayName: String,
  internalId: String,
  visibility: String,
  webUrl: String
});

PojosMetadataMap.create<GraphApp>('GraphApp', {
  id: String
});

PojosMetadataMap.create<GraphChannel>('GraphChannel', {
  id: String,
  displayName: String,
  membershipType: String,
  webUrl: String
});

PojosMetadataMap.create<GraphDrive>('GraphDrive', {
  id: String,
  webUrl: String
});

PojosMetadataMap.create<GraphGroup>('GraphGroup', {
  id: String,
  mail: String,
  assignedLabels: [ 'GraphLabel' ]
});

PojosMetadataMap.create<GraphLabel>('GraphLabel', {
  displayName: String,
  labelId: String
});

PojosMetadataMap.create<GraphMember>('GraphMember', {
  id: String,
  displayName: String,
  email: String,
  userId: String
});

PojosMetadataMap.create<GraphTab>('GraphTab', {
  id: String,
  displayName: String,
  webUrl: String,
  teamsApp: 'TeamsApp'
});

PojosMetadataMap.create<GraphTeam>('GraphTeam', {
  id: String,
  description: String,
  displayName: String,
  internalId: String,
  isArchived: Boolean,
  visibility: String,
  webUrl: String
});

PojosMetadataMap.create<Item>('Item', {
  value: Object,
  loading: Boolean,
  visible: Boolean
});

createMap<GraphChannel, Channel>(
  mapper,
  'GraphChannel',
  'Channel',
  forMember((target) => target.membershipType, mapFrom((source) => source.membershipType ?? undefined)),
  forMember((target) => target.webUrl, mapFrom((source) => source.webUrl ?? undefined))
);

export function mapChannel(value: GraphChannel) {
  return mapper.map<GraphChannel, Channel>(
    value,
    'GraphChannel',
    'Channel'
  );
}

createMap<GraphDrive, Drive>(
  mapper,
  'GraphDrive',
  'Drive',
  forMember((target) => target.webUrl, mapFrom((source) => source.webUrl ?? undefined))
);

export function mapDrive(value: GraphDrive) {
  return mapper.map<GraphDrive, Drive>(
    value,
    'GraphDrive',
    'Drive'
  );
}

createMap<GraphGroup, Group>(
  mapper,
  'GraphGroup',
  'Group',
  forMember((target) => target.email, mapFrom((source) => source.mail)),
  forMember(
    (target) => target.sensitivityLabel,
    mapFrom((source) => source.assignedLabels?.[0]?.displayName ?? undefined))
);

export function mapGroup(value: GraphGroup) {
  return mapper.map<GraphGroup, Group>(
    value,
    'GraphGroup',
    'Group'
  );
}

createMap<GraphMember, Member>(
  mapper,
  'GraphMember',
  'Member',
  forMember((target) => target.displayName, mapFrom((source) => source.displayName ?? undefined)),
  forMember((target) => target.email, mapFrom((source) => source.email ?? undefined)),
  forMember((target) => target.userId, mapFrom((source) => source.userId ?? undefined))
);

export function mapMember(value: GraphMember) {
  return mapper.map<GraphMember, Member>(
    value,
    'GraphMember',
    'Member'
  );
}

createMap<GraphTab, Tab>(
  mapper,
  'GraphTab',
  'Tab',
  forMember((target) => target.appId, mapFrom((source) => source.teamsApp?.id)),
  forMember((target) => target.displayName, mapFrom((source) => source.displayName ?? undefined)),
  forMember((target) => target.webUrl, mapFrom((source) => source.webUrl ?? undefined))
);

export function mapTab(value: GraphTab) {
  return mapper.map<GraphTab, Tab>(
    value,
    'GraphTab',
    'Tab'
  );
}

createMap<GraphTeam, Team>(
  mapper,
  'GraphTeam',
  'Team',
  forMember((target) => target.archived, mapFrom((source) => source.isArchived ?? false)),
  forMember((target) => target.description, mapFrom((source) => source.description ?? undefined)),
  forMember((target) => target.displayName, mapFrom((source) => source.displayName ?? undefined)),
  forMember((target) => target.internalId, mapFrom((source) => source.internalId ?? undefined)),
  forMember((target) => target.visibility, mapFrom((source) => source.visibility ?? undefined)),
  forMember((target) => target.webUrl, mapFrom((source) => source.webUrl ?? undefined))
);

export function mapTeam(value: GraphTeam) {
  return mapper.map<GraphTeam, Team>(
    value,
    'GraphTeam',
    'Team'
  );
}

createMap<Group, Item>(
  mapper,
  'Group',
  'Item',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.value, mapFrom((source) => source)),
  forMember((target) => target.loading, mapFrom(() => true)),
  forMember((target) => target.visible, mapFrom(() => true))
);

export function mapItemFromGroup(value: Group) {
  return mapper.map<Group, Item>(
    value,
    'Group',
    'Item'
  );
}

createMap<Team, Item>(
  mapper,
  'Team',
  'Item',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.loading, mapFrom(() => false)),
  forMember((target) => target.pinned, mapFrom(() => false)),
  forMember((target) => target.value, mapFrom((source) => source)),
  forMember((target) => target.visible, mapFrom(() => true))
);

export function mapItemFromTeam(value: Team) {
  return mapper.map<Team, Item>(
    value,
    'Team',
    'Item'
  );
}

createMap<Icon, Item>(
  mapper,
  'Icon',
  'Item',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.value.id, mapFrom((source) => source.id)),
  forMember((target) => target.value.icon, mapFrom((source) => source.data))
);

export function mapItemFromIcon(value: Icon) {
  return mapper.map<Icon, Item>(
    value,
    'Icon',
    'Item'
  );
}

createMap<Icon, Member>(
  mapper,
  'Icon',
  'Member',
  forMember((target) => target.id, ignore()),
  forMember((target) => target.userId, mapFrom((source) => source.id)),
  forMember((target) => target.icon, mapFrom((source) => source.data))
);

export function mapMemberFromIcon(value: Icon) {
  return mapper.map<Icon, Member>(
    value,
    'Icon',
    'Member'
  );
}

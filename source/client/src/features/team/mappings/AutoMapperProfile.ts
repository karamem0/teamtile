//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  Tab,
  Team,
  TeamInfo
} from '../../../types/Entity';
import {
  TeamsApp as GraphApp,
  Channel as GraphChannel,
  Drive as GraphDrive,
  Group as GraphGroup,
  AssignedLabel as GraphLabel,
  AadUserConversationMember as GraphMember,
  TeamsTab as GraphTab,
  Team as GraphTeam,
  AssociatedTeamInfo as GraphTeamInfo
} from '@microsoft/microsoft-graph-types';
import { PojosMetadataMap, pojos } from '@automapper/pojos';
import { TeamCard, TeamProps } from '../../../types/Store';
import {
  createMap,
  createMapper,
  forMember,
  fromValue,
  ignore,
  mapFrom
} from '@automapper/core';

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

PojosMetadataMap.create<TeamInfo>('TeamInfo', {
  id: String,
  displayName: String,
  tenantId: String
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

PojosMetadataMap.create<GraphTeamInfo>('GraphTeamInfo', {
  id: String,
  displayName: String,
  tenantId: String
});

PojosMetadataMap.create<TeamCard>('TeamCard', {
  team: 'TeamProps',
  loading: Boolean,
  visible: Boolean
});

PojosMetadataMap.create<TeamProps>('TeamProps', {
  id: String,
  archived: Boolean,
  description: String,
  displayName: String,
  email: String,
  internalId: String,
  sensitivityLabel: String,
  visibility: String,
  webUrl: String
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

createMap<GraphTeamInfo, TeamInfo>(
  mapper,
  'GraphTeamInfo',
  'TeamInfo',
  forMember((target) => target.displayName, mapFrom((source) => source.displayName ?? undefined)),
  forMember((target) => target.tenantId, mapFrom((source) => source.tenantId ?? undefined))
);

export function mapTeamInfo(value: GraphTeamInfo) {
  return mapper.map<GraphTeamInfo, TeamInfo>(
    value,
    'GraphTeamInfo',
    'TeamInfo'
  );
}

createMap<Group, TeamCard>(
  mapper,
  'Group',
  'TeamCard',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.team, mapFrom((source) => source))
);

export function mapCardFromGroup(value: Group) {
  return mapper.map<Group, TeamCard>(
    value,
    'Group',
    'TeamCard'
  );
}

createMap<Team, TeamCard>(
  mapper,
  'Team',
  'TeamCard',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.team, mapFrom((source) => source)),
  forMember((target) => target.loading, fromValue(false))
);

export function mapCardFromTeam(value: Team) {
  return mapper.map<Team, TeamCard>(
    value,
    'Team',
    'TeamCard'
  );
}

createMap<TeamInfo, TeamCard>(
  mapper,
  'TeamInfo',
  'TeamCard',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.team, mapFrom((source) => source)),
  forMember((target) => target.loading, fromValue(true)),
  forMember((target) => target.pinned, fromValue(false)),
  forMember((target) => target.visible, fromValue(true))
);

export function mapCardFromTeamInfo(value: TeamInfo) {
  return mapper.map<TeamInfo, TeamCard>(
    value,
    'TeamInfo',
    'TeamCard'
  );
}

createMap<Icon, TeamCard>(
  mapper,
  'Icon',
  'TeamCard',
  forMember((target) => target.id, mapFrom((source) => source.id)),
  forMember((target) => target.team.id, mapFrom((source) => source.id)),
  forMember((target) => target.team.icon, mapFrom((source) => source.data))
);

export function mapCardFromIcon(value: Icon) {
  return mapper.map<Icon, TeamCard>(
    value,
    'Icon',
    'TeamCard'
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

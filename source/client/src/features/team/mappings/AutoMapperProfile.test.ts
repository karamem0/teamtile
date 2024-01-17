//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { TeamVisibilityType } from '@microsoft/microsoft-graph-types';

import { MembershipType, VisibilityType } from '../../../types/Entity';

import {
  mapChannel,
  mapDrive,
  mapItemFromGroup,
  mapItemFromIcon,
  mapItemFromTeam,
  mapMember,
  mapMemberFromIcon,
  mapTab,
  mapTeam
} from './AutoMapperProfile';

test('transform channel', () => {
  const params = {
    value: {
      id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      displayName: 'General',
      webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
      membershipType: MembershipType.standard
    }
  };
  const expected = {
    id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
    displayName: 'General',
    webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
    membershipType: 'standard'
  };
  const actual = mapChannel(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform drive', () => {
  const params = {
    value: {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    }
  };
  const expected = {
    id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
    webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
  };
  const actual = mapDrive(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform member', () => {
  const params = {
    value: {
      id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      displayName: 'Adele Vance',
      userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      email: 'AdeleV@M365x214355.onmicrosoft.com'
    }
  };
  const expected = {
    id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
    displayName: 'Adele Vance',
    userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
    email: 'AdeleV@M365x214355.onmicrosoft.com'
  };
  const actual = mapMember(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform tab', () => {
  const params = {
    value: {
      id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
      webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
      displayName: 'Wiki',
      teamsApp: {
        id: 'com.microsoft.teamspace.tab.wiki'
      }
    }
  };
  const expected = {
    id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
    webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
    appId: 'com.microsoft.teamspace.tab.wiki',
    displayName: 'Wiki'
  };
  const actual = mapTab(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform team', () => {
  const params = {
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      isArchived: false,
      displayName: 'HR Taskforce',
      description: 'Welcome to the HR Taskforce team.',
      internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      visibility: 'private' as TeamVisibilityType,
      webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    archived: false,
    displayName: 'HR Taskforce',
    description: 'Welcome to the HR Taskforce team.',
    internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
    visibility: 'private',
    webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
  };
  const actual = mapTeam(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform group to item', () => {
  const params = {
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      email: 'HRTaskforce@M365x214355.onmicrosoft.com',
      sensitivityLabel: 'Restricted'
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      email: 'HRTaskforce@M365x214355.onmicrosoft.com',
      sensitivityLabel: 'Restricted'
    },
    loading: true,
    visible: true
  };
  const actual = mapItemFromGroup(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform team to item', () => {
  const params = {
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      archived: false,
      displayName: 'HR Taskforce',
      description: 'Welcome to the HR Taskforce team.',
      internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      visibility: VisibilityType.private,
      webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    loading: false,
    pinned: false,
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      archived: false,
      displayName: 'HR Taskforce',
      description: 'Welcome to the HR Taskforce team.',
      internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      visibility: 'private',
      webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    },
    visible: true
  };
  const actual = mapItemFromTeam(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform icon to item', () => {
  const params = {
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    value: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
    }
  };
  const actual = mapItemFromIcon(params.value);
  expect(actual).toStrictEqual(expected);
});

test('transform icon to member', () => {
  const params = {
    value: {
      id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
    }
  };
  const expected = {
    id: undefined,
    userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
  };
  const actual = mapMemberFromIcon(params.value);
  expect(actual).toStrictEqual(expected);
});

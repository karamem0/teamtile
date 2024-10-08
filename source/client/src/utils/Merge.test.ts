//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { margeCards, mergeMembers } from './Merge';
import { VisibilityType } from '../types/Entity';

it('should merge two arrays of TeamCard', () => {
  const param = {
    source: [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        loading: true,
        pinned: false,
        team: {
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          displayName: 'HR Taskforce',
          tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        },
        visible: true
      }
    ],
    target: [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        loading: false,
        team: {
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          archived: false,
          displayName: 'HR Taskforce',
          description: 'Welcome to the HR Taskforce team.',
          internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          visibility: 'private' as VisibilityType,
          webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      }
    ]
  };
  const expected = [
    {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      loading: false,
      pinned: false,
      team: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        archived: false,
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        visibility: 'private' as VisibilityType,
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      visible: true
    }
  ];
  const actual = margeCards(param.source, param.target);
  expect(actual).toStrictEqual(expected);
});

it('should merge two arrays of TeamMember', () => {
  const param = {
    source: [
      {
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        displayName: 'Adele Vance',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        email: 'AdeleV@M365x214355.onmicrosoft.com'
      }
    ],
    target: [
      {
        id: undefined,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ]
  };
  const expected = [
    {
      id: undefined,
      displayName: 'Adele Vance',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
      userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      email: 'AdeleV@M365x214355.onmicrosoft.com'
    }
  ];
  const actual = mergeMembers(param.source, param.target);
  expect(actual).toStrictEqual(expected);
});

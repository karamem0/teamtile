//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { VisibilityType } from '../types/Entity';
import { mergeCards, mergeMembers } from './Merge';

describe('mergeCards', () => {

  it('should get merged arrays of TeamCard', () => {
    const param = {
      source: [
        {
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          loading: true,
          pinned: false,
          team: {
            displayName: 'HR Taskforce',
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
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
            archived: false,
            description: 'Welcome to the HR Taskforce team.',
            displayName: 'HR Taskforce',
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
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
          archived: false,
          description: 'Welcome to the HR Taskforce team.',
          displayName: 'HR Taskforce',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
          visibility: 'private' as VisibilityType,
          webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        },
        visible: true
      }
    ];
    const actual = mergeCards(param.source, param.target);
    expect(actual).toStrictEqual(expected);
  });

  it('should preserve source order and ignore unmatched targets', () => {
    const source = [
      { id: 'first', team: { displayName: 'First', id: 'first' } },
      { id: 'second', pinned: true, team: { displayName: 'Second', id: 'second' } }
    ];
    const target = [
      { id: 'second', team: { icon: 'new-icon', id: 'second' } },
      { id: 'extra', team: { id: 'extra' } },
      { id: 'second', team: { icon: 'duplicate-icon', id: 'second' } }
    ];
    const originalSource = structuredClone(source);
    const originalTarget = structuredClone(target);
    const actual = mergeCards(source, target);
    expect(actual).toStrictEqual([
      source[0],
      {
        id: 'second',
        pinned: true,
        team: { displayName: 'Second', icon: 'new-icon', id: 'second' }
      }
    ]);
    expect(source).toStrictEqual(originalSource);
    expect(target).toStrictEqual(originalTarget);
    expect(mergeCards(source, [])).toStrictEqual(source);
    expect(mergeCards([], target)).toStrictEqual([]);
  });

});

describe('mergeMembers', () => {

  it('should get merged arrays of TeamMember', () => {
    const param = {
      source: [
        {
          displayName: 'Adele Vance',
          email: 'AdeleV@M365x214355.onmicrosoft.com',
          id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
        }
      ],
      target: [
        {
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
          id: undefined,
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
        }
      ]
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
        id: undefined,
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const actual = mergeMembers(param.source, param.target);
    expect(actual).toStrictEqual(expected);
  });

  it('should match by userId while preserving source order and unmatched members', () => {
    const source = [
      { displayName: 'First', id: 'first', userId: 'first-user' },
      { displayName: 'Second', id: 'second', userId: 'second-user' }
    ];
    const target = [
      { icon: 'new-icon', userId: 'second-user' },
      { icon: 'extra-icon', userId: 'extra-user' },
      { icon: 'duplicate-icon', userId: 'second-user' }
    ];
    const originalSource = structuredClone(source);
    const originalTarget = structuredClone(target);
    const actual = mergeMembers(source, target);
    expect(actual).toStrictEqual([
      source[0],
      { displayName: 'Second', icon: 'new-icon', id: 'second', userId: 'second-user' }
    ]);
    expect(source).toStrictEqual(originalSource);
    expect(target).toStrictEqual(originalTarget);
    expect(mergeMembers(source, [])).toStrictEqual(source);
    expect(mergeMembers([], target)).toStrictEqual([]);
  });

});

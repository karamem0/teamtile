//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as graphConfig from '../../../config/GraphConfig';
import {
  getChannels,
  getDrive,
  getGroups,
  getMemberIcons,
  getMembers,
  getTabs,
  getTagMembers,
  getTags,
  getTeamIcons,
  getTeamInfos,
  getTeams
} from './GraphRepository';

jest.mock('../../../config/GraphConfig');
const getConfig = graphConfig.getConfig as unknown as jest.Mock;

beforeEach(() => {
  jest.resetModules();
});

describe('getChannels', () => {

  it('should get channels', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      response: {
        value: [
          {
            id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
            displayName: 'General',
            webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            membershipType: 'standard'
          }
        ]
      }
    };
    const expected = [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        membershipType: 'standard'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getChannels(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getDrive', () => {

  it('should get drive', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      response: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    };
    const expected = {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    };
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getDrive(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getGroups', () => {

  it('should get groups', async () => {
    const params = {
      groupIds: [ '02bd9fd6-8f93-4758-87c3-1fb73740a315' ],
      response: {
        responses: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200,
            body: JSON.stringify({
              id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
              mail: 'HRTaskforce@M365x214355.onmicrosoft.com',
              assignedLabels: [
                {
                  labelId: '65f3af67-1866-4bf3-bd26-b98c7495f533',
                  displayName: 'Restricted'
                }
              ]
            })
          }
        ]
      }
    };
    const expected = [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        email: 'HRTaskforce@M365x214355.onmicrosoft.com',
        sensitivityLabel: 'Restricted'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          post: mock
        })
      }
    });
    const actual = await getGroups(params.groupIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getMemberIcons', () => {

  it('should get member icons', async () => {
    const params = {
      userIds: [ '87d349ed-44d7-43e1-9a83-5f2406dee5bd' ],
      response: {
        responses: [
          {
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            status: 200,
            headers: {
              'Content-Type': 'image/png'
            },
            body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
          }
        ]
      }
    };
    const expected = [
      {
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          post: mock
        })
      }
    });
    const actual = await getMemberIcons(params.userIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getMembers', () => {

  it('should get members', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      response: {
        value: [
          {
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      }
    };
    const expected = [
      {
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getMembers(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTabs', () => {

  it('should get tabs', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      channelId: '19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype',
      response: {
        value: [
          {
            id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
            webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            displayName: 'Wiki',
            teamsApp: {
              id: 'com.microsoft.teamspace.tab.wiki'
            }
          }
        ]
      }
    };
    const expected = [
      {
        id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        appId: 'com.microsoft.teamspace.tab.wiki',
        displayName: 'Wiki'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getTabs(params.teamId, params.channelId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTags', () => {

  it('should get tags', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      response: {
        value: [
          {
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
            displayName: 'Finance',
            description: 'Finance Team for Mach 8 Project',
            memberCount: 2
          }
        ]
      }
    };
    const expected = [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        displayName: 'Finance',
        description: 'Finance Team for Mach 8 Project',
        memberCount: 2
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getTags(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTagMembers', () => {

  it('should get tag members', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
      response: {
        value: [
          {
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
            displayName: 'Adele Vance',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      }
    };
    const expected = [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        displayName: 'Adele Vance',
        email: undefined,
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getTagMembers(params.teamId, params.tagId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTeamIcons', () => {

  it('should get team icons', async () => {
    const params = {
      teamIds: [ '02bd9fd6-8f93-4758-87c3-1fb73740a315' ],
      response: {
        responses: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200,
            headers: {
              'Content-Type': 'image/png'
            },
            body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
          }
        ]
      }
    };
    const expected = [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          post: mock
        })
      }
    });
    const actual = await getTeamIcons(params.teamIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTeamInfos', () => {

  it('should get team infos', async () => {
    const params = {
      response: {
        value: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            displayName: 'HR Taskforce',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      }
    };
    const expected = [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          get: mock
        })
      }
    });
    const actual = await getTeamInfos();
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTeams', () => {

  it('should get teams', async () => {
    const params = {
      teamIds: [ '02bd9fd6-8f93-4758-87c3-1fb73740a315' ],
      response: {
        responses: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200,
            body: JSON.stringify({
              id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
              displayName: 'HR Taskforce',
              description: 'Welcome to the HR Taskforce team.',
              internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
              isArchived: false,
              visibility: 'private',
              webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
            })
          }
        ]
      }
    };
    const expected = [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        archived: false,
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        visibility: 'private',
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = jest.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          version: jest.fn().mockReturnThis(),
          post: mock
        })
      }
    });
    const actual = await getTeams(params.teamIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

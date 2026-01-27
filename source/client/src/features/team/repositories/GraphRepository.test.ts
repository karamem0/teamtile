//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Mock } from 'vitest';
import * as graphConfig from '../../../config/GraphConfig';
import {
  getChannels,
  getDrive,
  getGroups,
  getMemberIcons,
  getMembers,
  getPrimaryChannel,
  getTabs,
  getTagMembers,
  getTags,
  getTeamIcons,
  getTeamInfos,
  getTeams
} from './GraphRepository';

vi.mock('../../../config/GraphConfig');
const getConfig = graphConfig.getConfig as Mock;

beforeEach(() => {
  vi.resetModules();
});

describe('getChannels', () => {

  it('should get channels', async () => {
    const params = {
      response: {
        value: [
          {
            displayName: 'General',
            id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
            membershipType: 'standard',
            webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = [
      {
        displayName: 'General',
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        membershipType: 'standard',
        primary: false,
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          header: vi.fn().mockReturnThis(),
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
        })
      }
    });
    const actual = await getChannels(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getDrive', () => {

  it('should get the drive', async () => {
    const params = {
      response: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    };
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
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
      groupIds: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af'
      ],
      response: {
        responses: [
          {
            body: JSON.stringify({
              assignedLabels: [
                {
                  displayName: 'Restricted',
                  labelId: '65f3af67-1866-4bf3-bd26-b98c7495f533'
                }
              ],
              id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
              mail: 'HRTaskforce@M365x214355.onmicrosoft.com'
            }),
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200
          },
          {
            id: '13be6971-79db-4f33-9d41-b25589ca25af',
            status: 403
          }
        ]
      }
    };
    const expected = [
      {
        email: 'HRTaskforce@M365x214355.onmicrosoft.com',
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        sensitivityLabel: 'Restricted'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
        })
      }
    });
    const actual = await getGroups(params.groupIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should raise an error when failed to retrieve groups', async () => {
    const params = {
      response: {
        responses: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 500
          }
        ]
      },
      teamIds: [ '02bd9fd6-8f93-4758-87c3-1fb73740a315' ]
    };
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
        })
      }
    });
    await expect(getGroups(params.teamIds)).rejects.toThrow();
  });

});

describe('getMemberIcons', () => {

  it('should get member icons', async () => {
    const params = {
      response: {
        responses: [
          {
            body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
            headers: {
              'Content-Type': 'image/png'
            },
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            status: 200
          },
          {
            id: '626cbf8c-5dde-46b0-8385-9e40d64736fe',
            status: 403
          }
        ]
      },
      userIds: [
        '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        '626cbf8c-5dde-46b0-8385-9e40d64736fe'
      ]
    };
    const expected = [
      {
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      },
      {
        data: undefined,
        id: '626cbf8c-5dde-46b0-8385-9e40d64736fe'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
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
      response: {
        value: [
          {
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        role: 'member',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
        })
      }
    });
    const actual = await getMembers(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getPrimaryChannel', () => {

  it('should get the primary channel', async () => {
    const params = {
      response: {
        displayName: 'General',
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        membershipType: 'standard',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = {
      displayName: 'General',
      id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      membershipType: 'standard',
      primary: false,
      webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    };
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
        })
      }
    });
    const actual = await getPrimaryChannel(params.teamId);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTabs', () => {

  it('should get tabs', async () => {
    const params = {
      channelId: '19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype',
      response: {
        value: [
          {
            displayName: 'Wiki',
            id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
            teamsApp: {
              id: 'com.microsoft.teamspace.tab.wiki'
            },
            webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = [
      {
        appId: 'com.microsoft.teamspace.tab.wiki',
        displayName: 'Wiki',
        id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
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
      response: {
        value: [
          {
            description: 'Finance Team for Mach 8 Project',
            displayName: 'Finance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
            memberCount: 2
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = [
      {
        description: 'Finance Team for Mach 8 Project',
        displayName: 'Finance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        memberCount: 2
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          version: vi.fn().mockReturnThis()
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
      response: {
        value: [
          {
            displayName: 'Adele Vance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: undefined,
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        role: 'member',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          version: vi.fn().mockReturnThis()
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
      response: {
        responses: [
          {
            body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
            headers: {
              'Content-Type': 'image/png'
            },
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200
          },
          {
            id: '13be6971-79db-4f33-9d41-b25589ca25af',
            status: 403
          }
        ]
      },
      teamIds: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af'
      ]
    };
    const expected = [
      {
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
      },
      {
        data: undefined,
        id: '13be6971-79db-4f33-9d41-b25589ca25af'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
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
            displayName: 'HR Taskforce',
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      }
    };
    const expected = [
      {
        displayName: 'HR Taskforce',
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          get: mock,
          select: vi.fn().mockReturnThis(),
          version: vi.fn().mockReturnThis()
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
      response: {
        responses: [
          {
            body: JSON.stringify({
              description: 'Welcome to the HR Taskforce team.',
              displayName: 'HR Taskforce',
              id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
              internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
              isArchived: false,
              summary: {
                guestsCount: 2,
                membersCount: 5,
                ownersCount: 1
              },
              visibility: 'private',
              webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
            }),
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 200
          },
          {
            id: '13be6971-79db-4f33-9d41-b25589ca25af',
            status: 403
          }
        ]
      },
      teamIds: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af'
      ]
    };
    const expected = [
      {
        archived: false,
        description: 'Welcome to the HR Taskforce team.',
        displayName: 'HR Taskforce',
        guestsCount: 2,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        membersCount: 5,
        ownersCount: 1,
        visibility: 'private',
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
        })
      }
    });
    const actual = await getTeams(params.teamIds);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should raise an error when failed to retrieve teams', async () => {
    const params = {
      response: {
        responses: [
          {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            status: 500
          }
        ]
      },
      teamIds: [ '02bd9fd6-8f93-4758-87c3-1fb73740a315' ]
    };
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      client: {
        api: () => ({
          post: mock,
          version: vi.fn().mockReturnThis()
        })
      }
    });
    await expect(getTeams(params.teamIds)).rejects.toThrow();
  });

});

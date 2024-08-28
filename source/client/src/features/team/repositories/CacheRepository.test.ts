//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as cacheConfig from '../../../config/CacheConfig';
import {
  clearAll,
  getChannels,
  getDrive,
  getIcon,
  getMembers,
  getPin,
  getTeam
} from './CacheRepository';

jest.mock('../../../config/CacheConfig');
const getConfig = cacheConfig.getConfig as unknown as jest.Mock;

beforeEach(() => {
  jest.resetModules();
});

test('clear all cache', async () => {
  const mock = jest.fn();
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        clear: mock
      })
    }
  });
  await clearAll();
  expect(mock).toHaveBeenCalled();
});

test('get channels of when expired is false', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: false,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      values: [
        {
          id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          displayName: 'General',
          webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
          membershipType: 'standard'
        }
      ]
    }
  };
  const expected = undefined;
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getChannels(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get channels of when expired is true', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: true,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      values: [
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
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getChannels(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get drive of when expired is false', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: false,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    }
  };
  const expected = undefined;
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getDrive(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get drive of when expired is true', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: true,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    }
  };
  const expected = {
    id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
    webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
  };
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getDrive(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get icon of when expired is true', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: true,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
      }
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
  };
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getIcon(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get icon of when expired is false', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: false,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
      }
    }
  };
  const expected = undefined;
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getIcon(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get members of when expired is true', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: true,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      values: [
        {
          id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          displayName: 'Adele Vance',
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          email: 'AdeleV@M365x214355.onmicrosoft.com'
        }
      ]
    }
  };
  const expected = [
    {
      id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      displayName: 'Adele Vance',
      userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
      email: 'AdeleV@M365x214355.onmicrosoft.com'
    }
  ];
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getMembers(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get members of when expired is false', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: false,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      values: [
        {
          id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          displayName: 'Adele Vance',
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          email: 'AdeleV@M365x214355.onmicrosoft.com'
        }
      ]
    }
  };
  const expected = undefined;
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getMembers(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get pin', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
  };
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getPin(params.teamId);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get team of when expired is true', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: true,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        visibility: 'private',
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    }
  };
  const expected = {
    id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    displayName: 'HR Taskforce',
    description: 'Welcome to the HR Taskforce team.',
    internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
    visibility: 'private',
    webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
  };
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getTeam(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

test('get team of when expired is false', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    expired: false,
    timestamp: 1,
    response: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      expired: 0,
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        visibility: 'private',
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    }
  };
  const expected = undefined;
  const mock = jest.fn().mockResolvedValue(params.response);
  getConfig.mockReturnValue({
    database: {
      table: jest.fn().mockReturnValue({
        get: mock
      })
    }
  });
  const actual = await getTeam(params.teamId, params.expired, params.timestamp);
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected);
});

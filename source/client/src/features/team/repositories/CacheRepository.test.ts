//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Mock } from 'vitest';
import * as cacheConfig from '../../../config/CacheConfig';
import {
  clearAll,
  getChannels,
  getDrive,
  getGroup,
  getIcon,
  getMembers,
  getOwners,
  getPin,
  getTagMembers,
  getTags,
  getTeam
} from './CacheRepository';

vi.mock('../../../config/CacheConfig');
const getConfig = cacheConfig.getConfig as Mock;

beforeEach(() => {
  vi.resetModules();
});

describe('clearAll', () => {

  it('should clear all cache', async () => {
    const mockTable = vi.fn();
    const mockClear = vi.fn();
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          clear: mockClear
        })
      }
    });
    await clearAll();
    expect(mockTable).toHaveBeenCalledWith('channels');
    expect(mockTable).toHaveBeenCalledWith('drives');
    expect(mockTable).toHaveBeenCalledWith('groups');
    expect(mockTable).toHaveBeenCalledWith('icons');
    expect(mockTable).toHaveBeenCalledWith('members');
    expect(mockTable).toHaveBeenCalledWith('tags');
    expect(mockTable).toHaveBeenCalledWith('teams');
    expect(mockClear).toHaveBeenCalled();
  });

});

describe('getChannels', () => {

  it('should get channels when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'General',
            id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
            membershipType: 'standard',
            webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = [
      {
        displayName: 'General',
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        membershipType: 'standard',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getChannels(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('channels');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get channels when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'General',
            id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
            membershipType: 'standard',
            webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = [
      {
        displayName: 'General',
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        membershipType: 'standard',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getChannels(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('channels');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getDrive', () => {

  it('should get drive when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
          webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getDrive(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('drives');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get drive when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
          webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getDrive(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('drives');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getGroup', () => {

  it('should get group when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          email: 'HRTaskforce@M365x214355.onmicrosoft.com',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          sensitivityLabel: 'Restricted'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = {
      email: 'HRTaskforce@M365x214355.onmicrosoft.com',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      sensitivityLabel: 'Restricted'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getGroup(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('groups');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should return undefined when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          email: 'HRTaskforce@M365x214355.onmicrosoft.com',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          sensitivityLabel: 'Restricted'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = {
      email: 'HRTaskforce@M365x214355.onmicrosoft.com',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      sensitivityLabel: 'Restricted'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getGroup(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('groups');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getIcon', () => {

  it('should get icon when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getIcon(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('icons');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get icon when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const mock = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: vi.fn().mockReturnValue({
          get: mock
        })
      }
    });
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getIcon(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('icons');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getMembers', () => {

  it('should get members when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getMembers(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('members');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get members when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getMembers(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('members');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getPin', () => {

  it('should get pin', async () => {
    const params = {
      response: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const expected = {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getPin(params.teamId);
    expect(mockTable).toHaveBeenCalledWith('pins');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getOwners', () => {

  it('should get owners when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getOwners(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('owners');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get owners when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            email: 'AdeleV@M365x214355.onmicrosoft.com',
            id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getOwners(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('owners');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTags', () => {

  it('should get tags when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            description: 'Finance Team for Mach 8 Project',
            displayName: 'Finance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
            memberCount: 2
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = [
      {
        description: 'Finance Team for Mach 8 Project',
        displayName: 'Finance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        memberCount: 2
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTags(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('tags');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get tags when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            description: 'Finance Team for Mach 8 Project',
            displayName: 'Finance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
            memberCount: 2
          }
        ]
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = [
      {
        description: 'Finance Team for Mach 8 Project',
        displayName: 'Finance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        memberCount: 2
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTags(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('tags');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTagMembers', () => {

  it('should get tag members when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
      timestamp: 1
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTagMembers(params.tagId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('tagmembers');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get tag members when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        values: [
          {
            displayName: 'Adele Vance',
            id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
            tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
            userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
          }
        ]
      },
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
      timestamp: 0
    };
    const expected = [
      {
        displayName: 'Adele Vance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ];
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTagMembers(params.tagId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('tagmembers');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTeam', () => {

  it('should get team when expired is true', async () => {
    const params = {
      expired: true,
      response: {
        expired: 0,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          description: 'Welcome to the HR Taskforce team.',
          displayName: 'HR Taskforce',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          visibility: 'private',
          webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 1
    };
    const expected = {
      description: 'Welcome to the HR Taskforce team.',
      displayName: 'HR Taskforce',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      visibility: 'private',
      webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTeam(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('teams');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get team when expired is false', async () => {
    const params = {
      expired: false,
      response: {
        expired: 1,
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: {
          description: 'Welcome to the HR Taskforce team.',
          displayName: 'HR Taskforce',
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          visibility: 'private',
          webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      },
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      timestamp: 0
    };
    const expected = {
      description: 'Welcome to the HR Taskforce team.',
      displayName: 'HR Taskforce',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      visibility: 'private',
      webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
    };
    const mockTable = vi.fn();
    const mockClear = vi.fn().mockResolvedValue(params.response);
    getConfig.mockReturnValue({
      database: {
        table: mockTable.mockReturnValue({
          get: mockClear
        })
      }
    });
    const actual = await getTeam(params.teamId, params.expired, params.timestamp);
    expect(mockTable).toHaveBeenCalledWith('teams');
    expect(mockClear).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

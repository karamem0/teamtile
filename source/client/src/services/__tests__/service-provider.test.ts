//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

jest.mock('@microsoft/microsoft-graph-client', () => ({
  Client: {
    initWithMiddleware: jest.fn().mockReturnValue({})
  }
}));

const cacheService = {
  getChannels: jest.fn(),
  getDrives: jest.fn(),
  getIcons: jest.fn(),
  getMembers: jest.fn(),
  getTeams: jest.fn(),
  setChannels: jest.fn(),
  setDrives: jest.fn(),
  setIcons: jest.fn(),
  setMembers: jest.fn(),
  setTeams: jest.fn()
};
jest.mock('../cache-service', () => ({
  CacheService: jest.fn().mockReturnValue(cacheService)
}));

const graphService = {
  getChannels: jest.fn(),
  getDrives: jest.fn(),
  getKeys: jest.fn(),
  getMemberIcons: jest.fn(),
  getMembers: jest.fn(),
  getTeamIcons: jest.fn(),
  getTeams: jest.fn()
};
jest.mock('../graph-service', () => ({
  GraphService: jest.fn().mockReturnValue(graphService)
}));

import { Client } from '@microsoft/microsoft-graph-client';

import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from '../../types/entity';
import { ServiceProvider } from '../service-provider';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('getChannelsFromCache', () => {

  it('return channels from cache', async () => {
    const json = await import('./__jsons__/channels.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Channel[]>(json.default as [[ string, Channel[] ]])
    };
    cacheService.getChannels.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannelsFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getChannels.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannelsFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getChannelsFromGraph', () => {

  it('return channels from graph', async () => {
    const json = await import('./__jsons__/channels.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Channel[]>(json.default as [[ string, Channel[] ]])
    };
    cacheService.getChannels.mockResolvedValue(new Map());
    graphService.getChannels.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannelsFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getChannels.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannelsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getDrivesFromCache', () => {

  it('return drives from cache', async () => {
    const json = await import('./__jsons__/drives.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Drive>(json.default as [[ string, Drive ]])
    };
    cacheService.getDrives.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrivesFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getDrives.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrivesFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getDrivesFromGraph', () => {

  it('return drives from graph', async () => {
    const json = await import('./__jsons__/drives.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Drive>(json.default as [[ string, Drive ]])
    };
    cacheService.getDrives.mockResolvedValue(new Map());
    graphService.getDrives.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrivesFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getDrives.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrivesFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getKeys', () => {

  it('return keys if succeeded', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ]
    };
    graphService.getKeys.mockResolvedValue(params.keys);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getKeys()).resolves.toEqual(params.keys);
  });

  it('return error if failed', () => {
    const params = {
      error: 'Something went wrong.'
    };
    graphService.getKeys.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getKeys()).rejects.toThrow(params.error);
  });

});

describe('getMemberIconsFromCache', () => {

  it('return member icons from cache', async () => {
    const json = await import('./__jsons__/member-icons.test.json');
    const params = {
      keys: [
        '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        '626cbf8c-5dde-46b0-8385-9e40d64736fe',
        '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
      ],
      json: new Map<string, Icon | null>(json.default as [[ string, Icon | null ]])
    };
    cacheService.getIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIconsFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIconsFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getMemberIconsFromGraph', () => {

  it('return member icons from graph', async () => {
    const json = await import('./__jsons__/member-icons.test.json');
    const params = {
      keys: [
        '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        '626cbf8c-5dde-46b0-8385-9e40d64736fe',
        '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
      ],
      json: new Map<string, Icon | null>(json.default as [[ string, Icon | null ]])
    };
    cacheService.getIcons.mockResolvedValue(new Map());
    graphService.getMemberIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIconsFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getMemberIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIconsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getMembersFromCache', () => {

  it('return members from cache', async () => {
    const json = await import('./__jsons__/members.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Member[]>(json.default as [[ string, Member[] ]])
    };
    cacheService.getMembers.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembersFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getMembers.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembersFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getMembersFromGraph', () => {

  it('return members from graph', async () => {
    const json = await import('./__jsons__/members.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Member[]>(json.default as [[ string, Member[] ]])
    };
    cacheService.getMembers.mockResolvedValue(new Map());
    graphService.getMembers.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembersFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getMembers.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembersFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeamIcons', () => {

  it('return team icons from cache', async () => {
    const json = await import('./__jsons__/team-icons.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Icon>(json.default as [[ string, Icon ]])
    };
    cacheService.getIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIconsFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('return error if failed', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIconsFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeamIconsFromGraph', () => {

  it('return team icons from graph', async () => {
    const json = await import('./__jsons__/team-icons.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Icon>(json.default as [[ string, Icon ]])
    };
    cacheService.getIcons.mockResolvedValue(new Map());
    graphService.getTeamIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIconsFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('return error if failed', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getTeamIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIconsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeamsFromCache', () => {

  it('return teams from cache', async () => {
    const json = await import('./__jsons__/teams.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Team>(json.default as [[ string, Team ]])
    };
    cacheService.getTeams.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamsFromCache(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    cacheService.getTeams.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamsFromCache(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeamsFromGraph', () => {

  it('return teams from graph', async () => {
    const json = await import('./__jsons__/teams.test.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Team>(json.default as [[ string, Team ]])
    };
    cacheService.getTeams.mockResolvedValue(new Map());
    graphService.getTeams.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamsFromGraph(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong.'
    };
    graphService.getTeams.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

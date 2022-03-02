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
  setDrive: jest.fn(),
  setIcon: jest.fn(),
  setMembers: jest.fn(),
  setTeam: jest.fn()
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
  Member,
  Team
} from '../../types/entity';
import { ServiceProvider } from '../service-provider';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('getChannels', () => {

  it('return channels from cache', async () => {
    const json = await import('./__jsons__/get-channels.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Channel[]>(json.default as [[ string, Channel[] ]])
    };
    cacheService.getChannels.mockResolvedValue(params.json);
    graphService.getChannels.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannels(params.keys)).resolves.toEqual(params.json);
  });

  it('return channels from graph', async () => {
    const json = await import('./__jsons__/get-channels.json');
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
    expect(target.getChannels(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getChannels.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getChannels(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getDrives', () => {

  it('return drives from cache', async () => {
    const json = await import('./__jsons__/get-drives.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Drive>(json.default as [[ string, Drive ]])
    };
    cacheService.getDrives.mockResolvedValue(params.json);
    graphService.getDrives.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrives(params.keys)).resolves.toEqual(params.json);
  });

  it('return drives from graph', async () => {
    const json = await import('./__jsons__/get-drives.json');
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
    expect(target.getDrives(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getDrives.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrives(params.keys)).rejects.toThrow(params.error);
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
      error: 'Something went wrong'
    };
    graphService.getKeys.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getKeys()).rejects.toThrow(params.error);
  });

});

describe('getMemberIcons', () => {

  it('return member icons from cache', async () => {
    const json = await import('./__jsons__/get-member-icons.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, string | null>(json.default as [[ string, string | null ]])
    };
    cacheService.getIcons.mockResolvedValue(params.json);
    graphService.getMemberIcons.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIcons(params.keys)).resolves.toEqual(params.json);
  });

  it('return member icons from graph', async () => {
    const json = await import('./__jsons__/get-member-icons.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, string | null>(json.default as [[ string, string | null ]])
    };
    cacheService.getIcons.mockResolvedValue(new Map());
    graphService.getMemberIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIcons(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMemberIcons(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getMembers', () => {

  it('return members from cache', async () => {
    const json = await import('./__jsons__/get-members.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Member[]>(json.default as [[ string, Member[] ]])
    };
    cacheService.getMembers.mockResolvedValue(params.json);
    graphService.getMembers.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembers(params.keys)).resolves.toEqual(params.json);
  });

  it('return members from graph', async () => {
    const json = await import('./__jsons__/get-members.json');
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
    expect(target.getMembers(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getMembers.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getMembers(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeamIcons', () => {

  it('return team icons from cache', async () => {
    const json = await import('./__jsons__/get-team-icons.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, string>(json.default as [[ string, string ]])
    };
    cacheService.getIcons.mockResolvedValue(params.json);
    graphService.getTeamIcons.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIcons(params.keys)).resolves.toEqual(params.json);
  });

  it('return team icons from graph', async () => {
    const json = await import('./__jsons__/get-team-icons.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, string>(json.default as [[ string, string ]])
    };
    cacheService.getIcons.mockResolvedValue(new Map());
    graphService.getTeamIcons.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIcons(params.keys)).resolves.toEqual(params.json);
  });

  it('return error if failed', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIcons(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTeams', () => {

  it('return teams from cache', async () => {
    const json = await import('./__jsons__/get-teams.json');
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      json: new Map<string, Team>(json.default as [[ string, Team ]])
    };
    cacheService.getTeams.mockResolvedValue(params.json);
    graphService.getTeams.mockResolvedValue(new Map());
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeams(params.keys)).resolves.toEqual(params.json);
  });

  it('return teams from graph', async () => {
    const json = await import('./__jsons__/get-teams.json');
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
    expect(target.getTeams(params.keys)).resolves.toEqual(params.json);
  });

  it('throw error if failed', () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      error: 'Something went wrong'
    };
    cacheService.getTeams.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeams(params.keys)).rejects.toThrow(params.error);
  });

});

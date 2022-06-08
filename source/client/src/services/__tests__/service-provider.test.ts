//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Client } from '@microsoft/microsoft-graph-client';

import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  Tab,
  Team
} from '../../types/entity';
import { CacheService } from '../cache-service';
import { GraphService } from '../graph-service';
import { ServiceProvider } from '../service-provider';

jest.mock('@microsoft/microsoft-graph-client', () => ({
  Client: {
    initWithMiddleware: jest.fn().mockReturnValue({})
  }
}));

jest.mock('../cache-service', () => ({
  CacheService: jest.fn().mockReturnValue({
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
  })
}));

jest.mock('../graph-service', () => ({
  GraphService: jest.fn().mockReturnValue({
    getChannels: jest.fn(),
    getDrives: jest.fn(),
    getGroups: jest.fn(),
    getMemberIcons: jest.fn(),
    getMembers: jest.fn(),
    getTeamIcons: jest.fn(),
    getTabs: jest.fn(),
    getTeams: jest.fn()
  })
}));

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
    const cacheService = new CacheService();
    const cacheGetChannels = cacheService.getChannels as jest.Mock;
    cacheGetChannels.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetChannels = cacheService.getChannels as jest.Mock;
    cacheGetChannels.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetChannels = cacheService.getChannels as jest.Mock;
    cacheGetChannels.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetChannels = graphService.getChannels as jest.Mock;
    graphGetChannels.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetChannels = graphService.getChannels as jest.Mock;
    graphGetChannels.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetDrives = cacheService.getDrives as jest.Mock;
    cacheGetDrives.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetDrives = cacheService.getDrives as jest.Mock;
    cacheGetDrives.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetDrives = cacheService.getDrives as jest.Mock;
    cacheGetDrives.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetDrives = graphService.getDrives as jest.Mock;
    graphGetDrives.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetDrives = graphService.getDrives as jest.Mock;
    graphGetDrives.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getDrivesFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getGroupsFromGraph', () => {

  it('return groups if succeeded', async () => {
    const json = await import('./__jsons__/groups.test.json');
    const params = {
      json: new Map<string, Group>(json.default as [[ string, Group ]])
    };
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetGroups = graphService.getGroups as jest.Mock;
    graphGetGroups.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getGroupsFromGraph()).resolves.not.toThrow();
  });

  it('return error if failed', () => {
    const params = {
      error: 'Something went wrong.'
    };
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetGroups = graphService.getGroups as jest.Mock;
    graphGetGroups.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getGroupsFromGraph()).rejects.toThrow(params.error);
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetIcons = graphService.getMemberIcons as jest.Mock;
    graphGetIcons.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetIcons = graphService.getMemberIcons as jest.Mock;
    graphGetIcons.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetMembers = cacheService.getMembers as jest.Mock;
    cacheGetMembers.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetMembers = cacheService.getMembers as jest.Mock;
    cacheGetMembers.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetMembers = cacheService.getMembers as jest.Mock;
    cacheGetMembers.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetMembers = graphService.getMembers as jest.Mock;
    graphGetMembers.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetMembers = graphService.getMembers as jest.Mock;
    graphGetMembers.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetIcons = cacheService.getIcons as jest.Mock;
    cacheGetIcons.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetIcons = graphService.getTeamIcons as jest.Mock;
    graphGetIcons.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetIcons = graphService.getTeamIcons as jest.Mock;
    graphGetIcons.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamIconsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

describe('getTabs', () => {

  it('return tabs', async () => {
    const json = await import('./__jsons__/tabs.test.json');
    const params = {
      itemKey: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      channelKey: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      json: json.default as Tab[]
    };
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetTabs = graphService.getTabs as jest.Mock;
    graphGetTabs.mockResolvedValue(params.json);
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTabs(params.itemKey, params.channelKey)).resolves.not.toThrow();
  });

  it('throw error if failed', () => {
    const params = {
      itemKey: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      channelKey: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
      error: 'Something went wrong.'
    };
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetTabs = graphService.getTabs as jest.Mock;
    graphGetTabs.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTabs(params.itemKey, params.channelKey)).rejects.toThrow(params.error);
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
    const cacheService = new CacheService();
    const cacheGetTeams = cacheService.getTeams as jest.Mock;
    cacheGetTeams.mockResolvedValue(params.json);
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
    const cacheService = new CacheService();
    const cacheGetTeams = cacheService.getTeams as jest.Mock;
    cacheGetTeams.mockRejectedValue(new Error(params.error));
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
    const cacheService = new CacheService();
    const cacheGetTeams = cacheService.getTeams as jest.Mock;
    cacheGetTeams.mockResolvedValue(new Map());
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetTeams = graphService.getTeams as jest.Mock;
    graphGetTeams.mockResolvedValue(params.json);
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
    const graphService = new GraphService(Client.initWithMiddleware({}));
    const graphGetTeams = graphService.getTeams as jest.Mock;
    graphGetTeams.mockRejectedValue(new Error(params.error));
    const target = new ServiceProvider(Client.initWithMiddleware({}));
    expect(target.getTeamsFromGraph(params.keys)).rejects.toThrow(params.error);
  });

});

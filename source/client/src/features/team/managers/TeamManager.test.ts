//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as teamService from '../services/TeamService';

import {
  getChannels,
  getDrive,
  getMembers,
  getTab
} from './TeamManager';

jest.mock('../services/TeamService');

beforeEach(() => {
  jest.resetModules();
});

test('get channels from cache', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    values: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        membershipType: 'standard'
      }
    ]
  };
  const mockCache = teamService.getChannelsFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getChannelsFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(params.values);
  mockGraph.mockResolvedValue(undefined);
  const actual = await getChannels(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).not.toBeCalled();
});

test('get channels from graph', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    values: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        membershipType: 'standard'
      }
    ]
  };
  const mockCache = teamService.getChannelsFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getChannelsFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(undefined);
  mockGraph.mockResolvedValue(params.values);
  const actual = await getChannels(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).toBeCalled();
});

test('get drive from cache', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    value: {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    }
  };
  const mockCache = teamService.getDriveFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getDriveFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(params.value);
  mockGraph.mockResolvedValue(undefined);
  const actual = await getDrive(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).not.toBeCalled();
});

test('get drive from graph', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    value: {
      id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
      webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
    }
  };
  const mockCache = teamService.getDriveFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getDriveFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(undefined);
  mockGraph.mockResolvedValue(params.value);
  const actual = await getDrive(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).toBeCalled();
});

test('get members from cache', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    values: [
      {
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        displayName: 'Adele Vance',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        email: 'AdeleV@M365x214355.onmicrosoft.com'
      }
    ]
  };
  const mockCache = teamService.getMembersFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getMembersFromGraph as unknown as jest.Mock;
  const mockCacheIcons = teamService.getMemberIconsFromCache as unknown as jest.Mock;
  const mockGraphIcons = teamService.getMemberIconsFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(params.values);
  mockGraph.mockResolvedValue(undefined);
  mockCacheIcons.mockResolvedValue(params.values);
  mockGraphIcons.mockResolvedValue(params.values);
  const actual = await getMembers(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).not.toBeCalled();
});

test('get members from graph', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    values: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        membershipType: 'standard'
      }
    ]
  };
  const mockCache = teamService.getMembersFromCache as unknown as jest.Mock;
  const mockGraph = teamService.getMembersFromGraph as unknown as jest.Mock;
  const mockCacheIcons = teamService.getMemberIconsFromCache as unknown as jest.Mock;
  const mockGraphIcons = teamService.getMemberIconsFromGraph as unknown as jest.Mock;
  mockCache.mockResolvedValue(undefined);
  mockGraph.mockResolvedValue(params.values);
  mockCacheIcons.mockResolvedValue(params.values);
  mockGraphIcons.mockResolvedValue(params.values);
  const actual = await getMembers(params.teamId);
  expect(actual).not.toBeUndefined();
  expect(mockCache).toBeCalled();
  expect(mockGraph).toBeCalled();
});

test('get tab', async () => {
  const params = {
    teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
    channelId: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
    appId: 'com.microsoft.teamspace.tab.wiki',
    values: [
      {
        id: 'caf5a7c7-15d6-470a-8275-8b392d7f98e5',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3A09fc54a3141a45d0bc769cf506d2e079%40thread.skype/tab%3a%3acaf5a7c7-15d6-470a-8275-8b392d7f98e5?label=Wiki&groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        appId: 'com.microsoft.teamspace.tab.wiki',
        displayName: 'Wiki'
      }
    ]
  };
  const mockGraph = teamService.getTabFromGraph as unknown as jest.Mock;
  mockGraph.mockResolvedValue(params.values);
  const actual = await getTab(params.teamId, params.channelId, params.appId);
  expect(actual).not.toBeUndefined();
  expect(mockGraph).toBeCalled();
});

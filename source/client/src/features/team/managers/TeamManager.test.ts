//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as teamService from '../services/TeamService';
import {
  clearCache,
  getCards,
  getChannels,
  getDrive,
  getMembers,
  getTab,
  getTagMembers,
  getTags,
  setPin
} from './TeamManager';
import { Mock } from 'vitest';
import { Tag } from '../../../types/Entity';

vi.mock('../services/TeamService');

beforeEach(() => {
  vi.resetModules();
});

describe('clearCache', () => {

  it('should clear the cache', async () => {
    const mock = teamService.clearCache as Mock;
    await clearCache();
    expect(mock).toHaveBeenCalled();
  });

});

describe('getCards', () => {

  it('should retrieve cards from the cache', async () => {
    const params = {
      teamInfos: [
        {
          id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          displayName: 'General',
          tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      ],
      values: [
        {
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          loading: false,
          pinned: false,
          team: {
            id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            archived: false,
            displayName: 'HR Taskforce',
            description: 'Welcome to the HR Taskforce team.',
            email: 'HRTaskforce@M365x214355.onmicrosoft.com',
            internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
            sensitivityLabel: 'Restricted',
            visibility: 'private',
            webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
          },
          visible: true
        }
      ]
    };
    const mockGetCardsFromTeamInfos = teamService.getCardsFromTeamInfos as Mock;
    const mockGetCardsFromCache = teamService.getCardsFromCache as Mock;
    const mockGetCardsFromGraphGroup = teamService.getCardsFromGraphGroup as Mock;
    const mockGetCardsFromGraphTeam = teamService.getCardsFromGraphTeam as Mock;
    const mockGetPins = teamService.getPins as Mock;
    const mockGetTeamIconsFromCache = teamService.getTeamIconsFromCache as Mock;
    const mockGetTeamIconsFromGraph = teamService.getTeamIconsFromGraph as Mock;
    mockGetCardsFromTeamInfos.mockResolvedValue(params.teamInfos);
    mockGetCardsFromCache.mockResolvedValue(params.values);
    mockGetCardsFromGraphGroup.mockResolvedValue(params.values);
    mockGetCardsFromGraphTeam.mockResolvedValue(params.values);
    mockGetPins.mockResolvedValue(params.values);
    mockGetTeamIconsFromCache.mockResolvedValue(params.values);
    mockGetTeamIconsFromGraph.mockResolvedValue(params.values);
    const actual = await getCards();
    expect(actual).not.toBeUndefined();
    expect(mockGetCardsFromTeamInfos).toHaveBeenCalled();
    expect(mockGetCardsFromCache).toHaveBeenCalled();
    expect(mockGetCardsFromGraphGroup).toHaveBeenCalled();
    expect(mockGetCardsFromGraphTeam).toHaveBeenCalled();
    expect(mockGetPins).toHaveBeenCalled();
    expect(mockGetTeamIconsFromCache).toHaveBeenCalled();
    expect(mockGetTeamIconsFromGraph).toHaveBeenCalled();
  });

});

describe('getChannels', () => {

  it('should retrieve channels from the cache', async () => {
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
    const mockCache = teamService.getChannelsFromCache as Mock;
    const mockGraph = teamService.getChannelsFromGraph as Mock;
    mockCache.mockResolvedValue(params.values);
    mockGraph.mockResolvedValue(undefined);
    const actual = await getChannels(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).not.toHaveBeenCalled();
  });

  it('should retrieve channels from the Microsoft Graph API', async () => {
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
    const mockCache = teamService.getChannelsFromCache as Mock;
    const mockGraph = teamService.getChannelsFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockResolvedValue(params.values);
    const actual = await getChannels(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should raise an error when failed to retrieve channels', async () => {
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
    const mockCache = teamService.getChannelsFromCache as Mock;
    const mockGraph = teamService.getChannelsFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    await expect(getChannels(params.teamId)).rejects.toThrow('Something went wrong');
  });

});

describe('getDrive', () => {

  it('should retrieve a drive from the cache', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      value: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    };
    const mockCache = teamService.getDriveFromCache as Mock;
    const mockGraph = teamService.getDriveFromGraph as Mock;
    mockCache.mockResolvedValue(params.value);
    mockGraph.mockResolvedValue(undefined);
    const actual = await getDrive(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).not.toHaveBeenCalled();
  });

  it('should retrieve a drive from the Microsoft Graph API', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      value: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    };
    const mockCache = teamService.getDriveFromCache as Mock;
    const mockGraph = teamService.getDriveFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockResolvedValue(params.value);
    const actual = await getDrive(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should retrieve undefined when failed to retrieve a drive', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      value: {
        id: 'b!UvZsiQCydEuBEcAT9kQGz_C9gbGAlohJgfeiSu5K_WrNO7djCV5dS4pWDvGiRupe',
        webUrl: 'https://m365x214355.sharepoint.com/sites/HRTaskforce/Shared%20Documents'
      }
    };
    const mockCache = teamService.getDriveFromCache as Mock;
    const mockGraph = teamService.getDriveFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    const actual = await getDrive(params.teamId);
    expect(actual).toBeUndefined();
  });

});

describe('getMembers', () => {

  it('should retrieve members from the cache', async () => {
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
    const mockCache = teamService.getMembersFromCache as Mock;
    const mockGraph = teamService.getMembersFromGraph as Mock;
    const mockCacheIcons = teamService.getMemberIconsFromCache as Mock;
    const mockGraphIcons = teamService.getMemberIconsFromGraph as Mock;
    mockCache.mockResolvedValue(params.values);
    mockGraph.mockResolvedValue(undefined);
    mockCacheIcons.mockResolvedValue(params.values);
    mockGraphIcons.mockResolvedValue(params.values);
    const actual = await getMembers(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).not.toHaveBeenCalled();
  });

  it('should retrieve members from the Microsoft Graph API', async () => {
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
    const mockCache = teamService.getMembersFromCache as Mock;
    const mockGraph = teamService.getMembersFromGraph as Mock;
    const mockCacheIcons = teamService.getMemberIconsFromCache as Mock;
    const mockGraphIcons = teamService.getMemberIconsFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockResolvedValue(params.values);
    mockCacheIcons.mockResolvedValue(params.values);
    mockGraphIcons.mockResolvedValue(params.values);
    const actual = await getMembers(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should raise an error when failed to retrieve members', async () => {
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
    const mockCache = teamService.getMembersFromCache as Mock;
    const mockGraph = teamService.getMembersFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    await expect(getMembers(params.teamId)).rejects.toThrow('Something went wrong');
  });

});

describe('getTab', () => {

  it('should retrieve a tab', async () => {
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
    const mockGraph = teamService.getTabFromGraph as Mock;
    mockGraph.mockResolvedValue(params.values);
    const actual = await getTab(params.teamId, params.channelId, params.appId);
    expect(actual).not.toBeUndefined();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should raise an error when failed to retrieve a tab', async () => {
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
    const mockGraph = teamService.getTabFromGraph as Mock;
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    await expect(getTab(params.teamId, params.channelId, params.appId)).rejects.toThrow('Something went wrong');
  });

});

describe('getTags', () => {

  it('should retrieve tags from the cache', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      values: [
        {
          id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
          displayName: 'Finance',
          description: 'Finance Team for Mach 8 Project',
          memberCount: 2
        }
      ]
    };
    const mockCache = teamService.getTagsFromCache as Mock;
    const mockGraph = teamService.getTagsFromGraph as Mock;
    mockCache.mockResolvedValue(params.values);
    mockGraph.mockResolvedValue(undefined);
    const actual = await getTags(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).not.toHaveBeenCalled();
  });

  it('should retrieve tags from the Microsoft Graph API', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      values: [
        {
          id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
          displayName: 'Finance',
          description: 'Finance Team for Mach 8 Project',
          memberCount: 2
        }
      ]
    };
    const mockCache = teamService.getTagsFromCache as Mock;
    const mockGraph = teamService.getTagsFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockResolvedValue(params.values);
    const actual = await getTags(params.teamId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should retrieve an empty array when failed to retrieve tags', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      values: [
        {
          id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
          displayName: 'Finance',
          description: 'Finance Team for Mach 8 Project',
          memberCount: 2
        }
      ]
    };
    const mockCache = teamService.getTagsFromCache as Mock;
    const mockGraph = teamService.getTagsFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    const expected = [] as Tag[];
    const actual = await getTags(params.teamId);
    expect(actual).toStrictEqual(expected);
  });

});

describe('getTagMembers', () => {

  it('should retrieve tag members from the cache', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
      values: [
        {
          id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
          displayName: 'Adele Vance',
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      ]
    };
    const mockCache = teamService.getTagMembersFromCache as Mock;
    const mockGraph = teamService.getTagMembersFromGraph as Mock;
    mockCache.mockResolvedValue(params.values);
    mockGraph.mockResolvedValue(undefined);
    const actual = await getTagMembers(params.teamId, params.tagId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).not.toHaveBeenCalled();
  });

  it('should retrieve tag members from the Microsoft Graph API', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
      values: [
        {
          id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
          displayName: 'Adele Vance',
          userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        }
      ]
    };
    const mockCache = teamService.getTagMembersFromCache as Mock;
    const mockGraph = teamService.getTagMembersFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockResolvedValue(params.values);
    const actual = await getTagMembers(params.teamId, params.tagId);
    expect(actual).not.toBeUndefined();
    expect(mockCache).toHaveBeenCalled();
    expect(mockGraph).toHaveBeenCalled();
  });

  it('should raise an error when failed to retrieve tag members', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      tagId: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk=='
    };
    const mockCache = teamService.getTagMembersFromCache as Mock;
    const mockGraph = teamService.getTagMembersFromGraph as Mock;
    mockCache.mockResolvedValue(undefined);
    mockGraph.mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    await expect(getTagMembers(params.teamId, params.tagId)).rejects.toThrow('Something went wrong');
  });

});

describe('setPin', () => {

  it('should set a pin', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      pinned: true
    };
    const expected = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      pinned: true
    };
    const mock = teamService.setPin as Mock;
    await setPin(params.teamId, params.pinned);
    expect(mock).toHaveBeenCalledWith(expected.teamId, expected.pinned);
  });

  it('should raise an error when failed to retrieve set a pin', async () => {
    const params = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      pinned: true
    };
    const expected = {
      teamId: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      pinned: true
    };
    const mock = teamService.setPin as Mock;
    await setPin(params.teamId, params.pinned);
    expect(mock).toHaveBeenCalledWith(expected.teamId, expected.pinned);
  });

});

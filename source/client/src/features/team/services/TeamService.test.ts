//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as cacheService from '../repositories/CacheRepository';
import * as graphService from '../repositories/GraphRepository';
import {
  getCardsFromCache,
  getCardsFromGraphGroup,
  getCardsFromGraphTeam,
  getMemberIconsFromCache,
  getMemberIconsFromGraph,
  getTeamIconsFromCache,
  getTeamIconsFromGraph
} from './TeamService';

vi.mock('../repositories/CacheRepository');
vi.mock('../repositories/GraphRepository');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('card merging', () => {

  const items = [
    { id: 'first', loading: true, pinned: true, team: { displayName: 'First', id: 'first' } },
    { id: 'second', loading: true, team: { displayName: 'Second', id: 'second' } }
  ];

  it('should merge cached group and team data without losing card state', async () => {
    vi.mocked(cacheService.getGroup).mockResolvedValue({ email: 'team@example.com', id: 'first' });
    vi.mocked(cacheService.getTeam).mockResolvedValue({ description: 'Description', id: 'first' });
    const actual = await getCardsFromCache([ items[0]! ]);
    expect(actual[0]).toMatchObject({
      id: 'first',
      loading: false,
      pinned: true,
      team: {
        description: 'Description',
        displayName: 'First',
        email: 'team@example.com',
        id: 'first'
      }
    });
    expect(items[0]?.loading).toBe(true);
    expect(items[0]?.team).not.toHaveProperty('email');
  });

  it('should merge graph groups by ID instead of array position', async () => {
    vi.mocked(graphService.getGroups).mockResolvedValue([
      { email: 'second@example.com', id: 'second' },
      { email: 'extra@example.com', id: 'extra' }
    ]);
    const actual = await getCardsFromGraphGroup(items);
    expect(actual).toHaveLength(2);
    expect(actual[0]).toStrictEqual(items[0]);
    expect(actual[1]).toMatchObject({
      id: 'second',
      team: { displayName: 'Second', email: 'second@example.com', id: 'second' }
    });
    expect(cacheService.setGroup).toHaveBeenCalledWith(
      'second',
      { email: 'second@example.com', id: 'second' }
    );
  });

  it('should merge graph teams by ID and update loading state', async () => {
    vi.mocked(graphService.getTeams).mockResolvedValue([
      { archived: false, id: 'second' },
      { archived: true, id: 'extra' }
    ]);
    const actual = await getCardsFromGraphTeam(items);
    expect(actual).toHaveLength(2);
    expect(actual[0]).toStrictEqual(items[0]);
    expect(actual[1]).toMatchObject({
      id: 'second',
      loading: false,
      team: { archived: false, displayName: 'Second', id: 'second' }
    });
  });

  it('should merge cached team icons without replacing other team properties', async () => {
    vi.mocked(cacheService.getIcon).mockResolvedValue({ data: 'team-icon', id: 'first' });
    const actual = await getTeamIconsFromCache([ items[0]! ]);
    expect(actual[0]).toMatchObject({
      id: 'first',
      pinned: true,
      team: { displayName: 'First', icon: 'team-icon', id: 'first' }
    });
  });

  it('should merge graph team icons by ID without adding unmatched cards', async () => {
    vi.mocked(graphService.getTeamIcons).mockResolvedValue([
      { data: 'team-icon', id: 'second' },
      { data: 'extra-icon', id: 'extra' }
    ]);
    const actual = await getTeamIconsFromGraph(items);
    expect(actual).toHaveLength(2);
    expect(actual[0]).toStrictEqual(items[0]);
    expect(actual[1]).toMatchObject({
      id: 'second',
      team: { displayName: 'Second', icon: 'team-icon', id: 'second' }
    });
  });

});

describe('member icon merging', () => {

  const items = [
    { displayName: 'First', id: 'first', userId: 'first-user' },
    { displayName: 'Second', id: 'second', userId: 'second-user' }
  ];

  it('should preserve member details when merging cached icons', async () => {
    vi.mocked(cacheService.getIcon).mockResolvedValue({ data: 'member-icon', id: 'first-user' });
    const actual = await getMemberIconsFromCache([ items[0]! ]);
    expect(actual[0]).toMatchObject({
      displayName: 'First',
      icon: 'member-icon',
      userId: 'first-user'
    });
    expect(actual[0]?.id).toBeUndefined();
    expect(items[0]?.id).toBe('first');
  });

  it('should merge graph icons by userId instead of member ID or array position', async () => {
    vi.mocked(graphService.getMemberIcons).mockResolvedValue([
      { data: 'member-icon', id: 'second-user' },
      { data: 'extra-icon', id: 'extra-user' }
    ]);
    const actual = await getMemberIconsFromGraph(items);
    expect(actual).toHaveLength(2);
    expect(actual[0]).toStrictEqual(items[0]);
    expect(actual[1]).toMatchObject({
      displayName: 'Second',
      icon: 'member-icon',
      userId: 'second-user'
    });
    expect(actual[1]?.id).toBeUndefined();
  });

});

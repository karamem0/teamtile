//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

/* eslint-disable import/first */

// Microsoft Teams
const microsoftTeams = {
  initialize: jest.fn(),
  getContext: jest.fn(),
  registerOnThemeChangeHandler: jest.fn()
};
jest.mock('@microsoft/teams-js', () => ({
  __esModule: true,
  ...microsoftTeams
}));

// Testing Library
import { renderHook } from '@testing-library/react-hooks';
// Fluent UI
import {
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';
// Hooks
import { useTheme } from '../use-theme';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTheme', () => {

  it('return default theme', async () => {
    const params = {
      context: {
        theme: 'default'
      }
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftTeams.getContext
      .mockImplementation((callback) => callback && callback(params.context));
    const { result } = renderHook(useTheme);
    const [ theme ] = result.current;
    expect(theme).toBe(teamsV2Theme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

  it('return dark theme', async () => {
    const params = {
      context: {
        theme: 'dark'
      }
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftTeams.getContext
      .mockImplementation((callback) => callback && callback(params.context));
    const { result } = renderHook(useTheme);
    const [ theme ] = result.current;
    expect(theme).toBe(teamsDarkV2Theme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

  it('return high contrast theme', () => {
    const params = {
      context: {
        theme: 'contrast'
      }
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftTeams.getContext
      .mockImplementation((callback) => callback && callback(params.context));
    const { result } = renderHook(useTheme);
    const [ theme ] = result.current;
    expect(theme).toBe(teamsHighContrastTheme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

});

//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Testing Library
import { renderHook } from '@testing-library/react-hooks';
// Microsoft Teams
import * as microsoftTeams from '@microsoft/teams-js';
// Fluent UI
import {
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';
// Hooks
import { useTheme } from '../use-theme';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useTheme', () => {

  it('return default theme', () => {
    const params = {
      context: {
        theme: 'default'
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'getContext')
      .mockImplementation((callback) => callback && callback(params.context));
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation(jest.fn());
    const { result } = renderHook(useTheme);
    const [ theme ] = result.current;
    expect(theme).toBe(teamsV2Theme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

  it('return dark theme', () => {
    const params = {
      context: {
        theme: 'dark'
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'getContext')
      .mockImplementation((callback) => callback && callback(params.context));
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation(jest.fn());
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
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'getContext')
      .mockImplementation((callback) => callback && callback(params.context));
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation(jest.fn());
    const { result } = renderHook(useTheme);
    const [ theme ] = result.current;
    expect(theme).toBe(teamsHighContrastTheme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

});

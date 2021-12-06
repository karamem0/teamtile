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
  app: {
    initialize: jest.fn(),
    getContext: jest.fn(),
    registerOnThemeChangeHandler: jest.fn()
  }
};
jest.mock('@microsoft/teams-js', () => ({
  __esModule: true,
  ...microsoftTeams
}));

// Testing Library
import { act, renderHook } from '@testing-library/react-hooks';
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

  it('return default theme', () => {
    const params = {
      context: {
        app: {
          theme: 'default'
        }
      }
    };
    microsoftTeams.app.getContext
      .mockResolvedValue(params.context);
    act(() => {
      const { result } = renderHook(useTheme);
      const [ theme ] = result.current;
      expect(theme).toBe(teamsV2Theme);
    });
  });

  it('return dark theme', async () => {
    const params = {
      context: {
        app: {
          theme: 'dark'
        }
      }
    };
    microsoftTeams.app.getContext
      .mockResolvedValue(params.context);
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(useTheme);
      await waitForNextUpdate();
      const [ theme ] = result.current;
      expect(theme).toBe(teamsDarkV2Theme);
      expect(microsoftTeams.app.initialize).toBeCalled();
      expect(microsoftTeams.app.getContext).toBeCalled();
      expect(microsoftTeams.app.registerOnThemeChangeHandler).toBeCalled();
    });
  });

  it('return high contrast theme', async () => {
    const params = {
      context: {
        app: {
          theme: 'contrast'
        }
      }
    };
    microsoftTeams.app.getContext
      .mockResolvedValue(params.context);
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(useTheme);
      await waitForNextUpdate();
      const [ theme ] = result.current;
      expect(theme).toBe(teamsHighContrastTheme);
      expect(microsoftTeams.app.initialize).toBeCalled();
      expect(microsoftTeams.app.getContext).toBeCalled();
      expect(microsoftTeams.app.registerOnThemeChangeHandler).toBeCalled();
    });
  });

});

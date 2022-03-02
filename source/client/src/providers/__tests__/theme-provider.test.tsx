//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

const microsoftTeams = {
  app: {
    initialize: jest.fn(),
    getContext: jest.fn(),
    registerOnThemeChangeHandler: jest.fn()
  }
};
jest.mock('@microsoft/teams-js', () => ({
  ...microsoftTeams
}));

const inTeamsValue = {
  inTeams: null as boolean | null
};
jest.mock('../../hooks/use-in-teams', () => ({
  useInTeams: jest.fn().mockReturnValue(inTeamsValue)
}));

import React from 'react';

import { render, waitFor } from '@testing-library/react';

import {
  ThemePrepared,
  useFluentContext,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';

import { ThemeProvider } from '../theme-provider';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTheme', () => {

  it('return default theme', async () => {
    const params = {
      context: {
        app: {
          theme: 'default'
        }
      },
      theme: null as ThemePrepared | null
    };
    microsoftTeams.app.getContext.mockResolvedValue(params.context);
    inTeamsValue.inTeams = true;
    const Mock = (): React.ReactElement | null => {
      const context = useFluentContext();
      React.useEffect(() => {
        params.theme = context.theme;
      }, [
        context
      ]);
      return (
        <div data-testid="Mock" />
      );
    };
    render(
      <ThemeProvider>
        <Mock />
      </ThemeProvider>
    );
    await waitFor(() => expect(params.theme).toEqual(teamsV2Theme));
  });

  it('return dark theme', async () => {
    const params = {
      context: {
        app: {
          theme: 'dark'
        }
      },
      theme: null as ThemePrepared | null
    };
    microsoftTeams.app.getContext.mockResolvedValue(params.context);
    inTeamsValue.inTeams = true;
    const Mock = (): React.ReactElement | null => {
      const context = useFluentContext();
      React.useEffect(() => {
        params.theme = context.theme;
      }, [
        context
      ]);
      return (
        <div data-testid="Mock" />
      );
    };
    render(
      <ThemeProvider>
        <Mock />
      </ThemeProvider>
    );
    await waitFor(() => expect(params.theme).toEqual(teamsDarkV2Theme));
  });

  it('return contrast theme', async () => {
    const params = {
      context: {
        app: {
          theme: 'contrast'
        }
      },
      theme: null as ThemePrepared | null
    };
    microsoftTeams.app.getContext.mockResolvedValue(params.context);
    inTeamsValue.inTeams = true;
    const Mock = (): React.ReactElement | null => {
      const context = useFluentContext();
      React.useEffect(() => {
        params.theme = context.theme;
      }, [
        context
      ]);
      return (
        <div data-testid="Mock" />
      );
    };
    render(
      <ThemeProvider>
        <Mock />
      </ThemeProvider>
    );
    await waitFor(() => expect(params.theme).toEqual(teamsHighContrastTheme));
  });

});

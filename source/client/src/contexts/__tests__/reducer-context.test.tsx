//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/channeltile/blob/master/LICENSE
//

// React
import React from 'react';
// Testing Library
import { act, render } from '@testing-library/react';
// Contexts
import { ReducerContextProvider, useReducerContext } from '../reducer-context';
// Types
import { ActionType, ItemKey } from '../../types/reducer';
import {
  Channel,
  Drive,
  Member,
  Team
} from '../../types/entity';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useServiceContext', () => {

  it('dispatchChannels', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Channel[]>()
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchChannels } = useReducerContext();
        React.useEffect(() => {
          dispatchChannels(params.payload);
        }, [
          dispatchChannels
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setChannels,
      payload: params.payload
    });
  });

  it('dispatchDrives', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Drive>()
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchDrives } = useReducerContext();
        React.useEffect(() => {
          dispatchDrives(params.payload);
        }, [
          dispatchDrives
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setDrives,
      payload: params.payload
    });
  });

  it('dispatchFilter', () => {
    const params = {
      dispatch: jest.fn(),
      payload: null
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchFilter } = useReducerContext();
        React.useEffect(() => {
          dispatchFilter(params.payload);
        }, [
          dispatchFilter
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setFilter,
      payload: params.payload
    });
  });

  it('dispatchKeys', () => {
    const params = {
      dispatch: jest.fn(),
      payload: []
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchKeys } = useReducerContext();
        React.useEffect(() => {
          dispatchKeys(params.payload);
        }, [
          dispatchKeys
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setKeys,
      payload: params.payload
    });
  });

  it('dispatchLoading', () => {
    const params = {
      dispatch: jest.fn(),
      payload: true
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchLoading } = useReducerContext();
        React.useEffect(() => {
          dispatchLoading(params.payload);
        }, [
          dispatchLoading
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setLoading,
      payload: params.payload
    });
  });

  it('dispatchMemberIcons', () => {
    const params = {
      dispatch: jest.fn(),
      payload: {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: new Map<string, string>()
      }
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchMemberIcons } = useReducerContext();
        React.useEffect(() => {
          dispatchMemberIcons(params.payload);
        }, [
          dispatchMemberIcons
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setMemberIcons,
      payload: params.payload
    });
  });

  it('dispatchMembers', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Member[]>()
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchMembers } = useReducerContext();
        React.useEffect(() => {
          dispatchMembers(params.payload);
        }, [
          dispatchMembers
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setMembers,
      payload: params.payload
    });
  });

  it('dispatchTeamIcons', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, string>()
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchTeamIcons } = useReducerContext();
        React.useEffect(() => {
          dispatchTeamIcons(params.payload);
        }, [
          dispatchTeamIcons
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setTeamIcons,
      payload: params.payload
    });
  });

  it('dispatchTeams', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Team>()
    };
    jest.spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    act(() => {
      const Mock = (): React.ReactElement | null => {
        const { dispatchTeams } = useReducerContext();
        React.useEffect(() => {
          dispatchTeams(params.payload);
        }, [
          dispatchTeams
        ]);
        return null;
      };
      render(
        <ReducerContextProvider>
          <Mock />
        </ReducerContextProvider>
      );
    });
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setTeams,
      payload: params.payload
    });
  });

});

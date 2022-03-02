//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import {
  Channel,
  Drive,
  Member,
  Team
} from '../../types/entity';
import { ActionType } from '../../types/reducer';
import { ItemKey, Loading } from '../../types/state';
import { ReducerContextProvider, useReducerContext } from '../reducer-context';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('dispatchChannels', () => {

  it('dispatch channels', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Channel[]>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchChannels } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setChannels,
      payload: params.payload
    });
  });

});

describe('dispatchDrives', () => {

  it('dispatch drives', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Drive>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchDrives } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setDrives,
      payload: params.payload
    });
  });

});

describe('dispatchFilter', () => {

  it('dispatch filter', () => {
    const params = {
      dispatch: jest.fn(),
      payload: null
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchFilter } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setFilter,
      payload: params.payload
    });
  });

});

describe('dispatchKeys', () => {

  it('dispatch keys', () => {
    const params = {
      dispatch: jest.fn(),
      payload: []
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchKeys } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setKeys,
      payload: params.payload
    });
  });

});

describe('dispatchLoading', () => {

  it('dispatch loading', () => {
    const params = {
      dispatch: jest.fn(),
      payload: Loading.none
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchLoading } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setLoading,
      payload: params.payload
    });
  });

});

describe('dispatchMemberIcons', () => {

  it('dispatch member icons', () => {
    const params = {
      dispatch: jest.fn(),
      payload: {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: new Map<string, string>()
      }
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchMemberIcons } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setMemberIcons,
      payload: params.payload
    });
  });

});

describe('dispatchMembers', () => {

  it('dispatch members', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Member[]>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchMembers } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setMembers,
      payload: params.payload
    });
  });

});

describe('dispatchTeamIcons', () => {

  it('dispatch team icons', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, string>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchTeamIcons } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setTeamIcons,
      payload: params.payload
    });
  });

});

describe('dispatchTeams', () => {

  it('dispatch teams', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, Team>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchTeams } } = useReducerContext();
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
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setTeams,
      payload: params.payload
    });
  });

});

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
  Icon,
  Member,
  Team
} from '../../types/entity';
import { ActionType } from '../../types/reducer';
import { ItemKey } from '../../types/state';
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

describe('dispatchItemFilter', () => {

  it('dispatch item filter', () => {
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
      const { dispatchers: { dispatchItemFilter } } = useReducerContext();
      React.useEffect(() => {
        dispatchItemFilter(params.payload);
      }, [
        dispatchItemFilter
      ]);
      return null;
    };
    render(
      <ReducerContextProvider>
        <Mock />
      </ReducerContextProvider>
    );
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setItemFilter,
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

describe('dispatchLoadingKeys', () => {

  it('dispatch loading keys', () => {
    const params = {
      dispatch: jest.fn(),
      payload: true
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchLoadingKeys } } = useReducerContext();
      React.useEffect(() => {
        dispatchLoadingKeys(params.payload);
      }, [
        dispatchLoadingKeys
      ]);
      return null;
    };
    render(
      <ReducerContextProvider>
        <Mock />
      </ReducerContextProvider>
    );
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setLoadingKeys,
      payload: params.payload
    });
  });

});

describe('dispatchLoadingValues', () => {

  it('dispatch loading items', () => {
    const params = {
      dispatch: jest.fn(),
      payload: new Map<ItemKey, boolean>()
    };
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([
        null,
        params.dispatch
      ]);
    const Mock = (): React.ReactElement | null => {
      const { dispatchers: { dispatchLoadingValues } } = useReducerContext();
      React.useEffect(() => {
        dispatchLoadingValues(params.payload);
      }, [
        dispatchLoadingValues
      ]);
      return null;
    };
    render(
      <ReducerContextProvider>
        <Mock />
      </ReducerContextProvider>
    );
    expect(params.dispatch).toBeCalledWith({
      type: ActionType.setLoadingValues,
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
        value: new Map<string, Icon | null>()
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
      payload: new Map<ItemKey, Icon | null>()
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

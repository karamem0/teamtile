//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import useTeam from '../useTeam';
import json from './useTeam.test.json';

describe('useTeam', () => {

  it('return team', async () => {
    const params = {
      team: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.'
      },
      json: json,
      url: 'https://developer.microsoft.com/85003a80-9e86-4d59-a4a9-97553797bbe3'
    };
    jest
      .spyOn(microsoftGraph, 'BatchResponseContent')
      .mockReturnValue({
        getResponses: () => new Map<string, Response>(
          params.json.responses.map((item) => ([
            item.id,
            new Response(
              typeof (item.body) === 'string'
                ? item.body
                : JSON.stringify(item.body),
              {
                status: item.status
              })
          ]))
        )
      } as unknown as microsoftGraph.BatchResponseContent);
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          post: () => Promise.resolve()
        })
      } as unknown as microsoftGraph.Client);
    jest
      .spyOn(React, 'useContext')
      .mockReturnValue([
        microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        undefined,
        undefined,
        jest.fn()
      ]);
    URL.createObjectURL = jest.fn(() => params.url);
    const { result, waitForNextUpdate } = renderHook(
      useTeam,
      {
        initialProps: {
          team: params.team
        }
      });
    await waitForNextUpdate();
    const [
      team,
      channels,
      members,
      drive
    ] = result.current;
    expect(team).not.toBeUndefined();
    expect(channels).not.toBeUndefined();
    expect(members).not.toBeUndefined();
    expect(drive).not.toBeUndefined();
  });

});

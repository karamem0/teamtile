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
import useTeams from '../useTeams';
import json from './useTeams.test.json';

describe('useTeams', () => {

  it('return teams', async () => {
    const params = {
      json: json
    };
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          header: () => ({
            version: () => ({
              count: () => ({
                filter: () => ({
                  orderby: () => ({
                    get: () => Promise.resolve(params.json)
                  })
                })
              })
            })
          })
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
    const { result, waitForNextUpdate } = renderHook(useTeams);
    await waitForNextUpdate();
    const [ teams ] = result.current;
    expect(teams).not.toBeUndefined();
  });

});

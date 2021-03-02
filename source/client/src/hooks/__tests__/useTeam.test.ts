import { renderHook } from '@testing-library/react-hooks';
import useTeam from '../useTeam';
import json from './useTeam.test.json';

describe('useTeam', () => {

  it('return team', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      json: json
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(params.json)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(
      useTeam,
      {
        initialProps: {
          token: params.token,
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ team ] = result.current;
    expect(team?.id).not.toBeUndefined();
  });

});

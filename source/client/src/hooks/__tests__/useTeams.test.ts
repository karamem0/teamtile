import { renderHook } from '@testing-library/react-hooks';
import useTeams from '../useTeams';
import json from './useTeams.test.json';

describe('useTeams', () => {

  it('return teams', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      json: json
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(params.json)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(
      useTeams,
      {
        initialProps: {
          token: params.token
        }
      });
    await waitForNextUpdate();
    const [ teams, error ] = result.current;
    expect(teams).not.toBeUndefined();
    expect(error).toBeUndefined();
  });

});

import { renderHook } from '@testing-library/react-hooks';
import useUserIcon from '../useUserIcon';

describe('useUserIcon', () => {

  it('return user icon', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      id: '48d31887-5fad-4d73-a9f5-3c356e68a038',
      blob: new Blob(),
      url: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      blob: () => Promise.resolve(params.blob)
    } as Response));
    global.URL.createObjectURL = jest.fn(() => params.url);
    const { result, waitForNextUpdate } = renderHook(
      useUserIcon,
      {
        initialProps: {
          token: params.token,
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ url ] = result.current;
    expect(url).toBe(params.url);
  });

});

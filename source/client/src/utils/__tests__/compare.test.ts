//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { compare } from '../compare';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('compare', () => {

  it('compare values (a-z)', () => {
    const params = {
      a: { value: 'a' },
      z: { value: 'z' }
    };
    expect(compare(params.a.value, params.z.value)).toBe(-1);
  });

  it('compare values (z-a)', () => {
    const params = {
      a: { value: 'a' },
      z: { value: 'z' }
    };
    expect(compare(params.z.value, params.a.value)).toBe(1);
  });

  it('compare values (a-a)', () => {
    const params = {
      a: { value: 'a' }
    };
    expect(compare(params.a.value, params.a.value)).toBe(0);
  });

  it('compare values (a-null)', () => {
    const params = {
      a: { value: 'a' }
    };
    expect(compare(params.a.value, null)).toBe(-1);
  });

  it('compare values (null-a)', () => {
    const params = {
      a: { value: 'a' }
    };
    expect(compare(null, params.a.value)).toBe(1);
  });

});

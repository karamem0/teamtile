//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { getConfig } from './GraphConfig';

describe('getConfig', () => {

  it('should get the initialized config', () => {
    const config = getConfig();
    expect(config).toBeDefined();
  });

  it('should get the same instance of config', () => {
    const config1 = getConfig();
    const config2 = getConfig();
    expect(config1).toBe(config2);
  });

});

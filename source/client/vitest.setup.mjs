//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import '@testing-library/jest-dom/vitest';
import { createSerializer } from '@emotion/jest';
import { expect } from 'vitest';

expect.addSnapshotSerializer(createSerializer());

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock Request
const Request = global.Request;
global.Request = class {
  constructor(input, init) {
    return new Request(`https://127.0.0.1/${input}`, init);
  }
};

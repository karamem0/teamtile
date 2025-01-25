//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import 'jest-localstorage-mock';
import { TextDecoder } from 'util';
import fetchMock from 'jest-fetch-mock';

// Mock fetch
fetchMock.enableMocks();
// Mock env
jest.mock('./src/env', () => ({}));
// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));
// Text decoder
globalThis.TextDecoder = TextDecoder;

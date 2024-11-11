//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import 'jest-localstorage-mock';
import fetchMock from 'jest-fetch-mock';

// Mock fetch
fetchMock.enableMocks();
// Mock env
jest.mock('./src/env', () => ({}));

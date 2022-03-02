//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

const blobUrlValue = {
  url: null as string | null
};
jest.mock('../../hooks/use-blob-url', () => ({
  useBlobUrl: jest.fn().mockReturnValue(blobUrlValue)
}));

import React from 'react';

import { render, screen } from '@testing-library/react';

import { MemberIcon } from '../member-icon';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('MemberIcon', () => {

  it('create shapshot when icon is null', () => {
    const params = {
      name: 'Megan Bowen',
      icon: null
    };
    blobUrlValue.url = null;
    render(<MemberIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when icon is not null', () => {
    const params = {
      name: 'Megan Bowen',
      icon: null
    };
    blobUrlValue.url = 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258';
    render(<MemberIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});

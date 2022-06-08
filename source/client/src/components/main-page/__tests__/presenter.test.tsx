//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import MainPage from '../presenter';

jest.mock('../../empty-panel', () => ({
  EmptyPanel: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="EmptyPanel">
      {children}
    </div>
  )
}));

jest.mock('../../error-panel', () => ({
  ErrorPanel: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ErrorPanel">
      {children}
    </div>
  )
}));

jest.mock('../../loader-panel', () => ({
  LoaderPanel: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="LoaderPanel">
      {children}
    </div>
  )
}));

jest.mock('../../team-content', () => ({
  TeamContent: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="TeamContent">
      {children}
    </div>
  )
}));

jest.mock('../../team-panel', () => ({
  TeamPanel: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="TeamPanel">
      {children}
    </div>
  )
}));

jest.mock('../../team-not-found', () => ({
  TeamNotFound: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="TeamNotFound">
      {children}
    </div>
  )
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('MainPage', () => {

  it('create shapshot when loading', () => {
    const params = {
      error: null,
      state: {
        itemFilter: undefined,
        items: [],
        loading: true
      }
    };
    render(<MainPage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when loaded', () => {
    const params = {
      error: null,
      state: {
        itemFilter: undefined,
        items: [
          {
            key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            value: null,
            loading: false,
            visible: true
          }
        ],
        loading: false
      }
    };
    render(<MainPage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when item is empty', () => {
    const params = {
      error: null,
      state: {
        itemFilter: undefined,
        items: [],
        loading: false
      }
    };
    render(<MainPage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when item is not found', () => {
    const params = {
      error: null,
      state: {
        itemFilter: undefined,
        items: [
          {
            key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
            value: null,
            loading: false,
            visible: false
          }
        ],
        loading: false
      }
    };
    render(<MainPage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when error has occurred', () => {
    const params = {
      error: 'Something went wrong.',
      state: {
        itemFilter: undefined,
        items: [],
        loading: undefined
      }
    };
    render(<MainPage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});

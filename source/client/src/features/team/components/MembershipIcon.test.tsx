//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { MembershipType } from '../../../types/Entity';

import MembershipIcon from './MembershipIcon.presenter';

test('create shapshot of when MembershipType is standard', async () => {
  const params = {
    value: MembershipType.standard
  };
  render(<MembershipIcon {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when MembershipType is private', async () => {
  const params = {
    value: MembershipType.private
  };
  render(<MembershipIcon {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when MembershipType is undefined', async () => {
  const params = {
    value: undefined
  };
  render(<MembershipIcon {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

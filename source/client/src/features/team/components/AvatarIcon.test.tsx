//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import AvatarIcon from './AvatarIcon.presenter';

test('create shapshot of when url is undefined', async () => {
  const params = {
    icon: undefined,
    name: 'HR Taskforce',
    size: undefined
  };
  const { asFragment } = render(<AvatarIcon {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when url is not undefined', async () => {
  const params = {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    name: 'HR Taskforce',
    size: undefined
  };
  const { asFragment } = render(<AvatarIcon {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

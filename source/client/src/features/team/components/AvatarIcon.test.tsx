//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './AvatarIcon.presenter';
import { render } from '@testing-library/react';

it('should create a snapshot when icon is undefined', () => {
  const params = {
    icon: undefined,
    name: 'HR Taskforce',
    size: undefined
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a snapshot when icon is not undefined', () => {
  const params = {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    name: 'HR Taskforce',
    size: undefined
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});

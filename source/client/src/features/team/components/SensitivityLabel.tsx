//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './SensitivityLabel.presenter';

interface SensitivityLabelProps {
  label?: string
}

function SensitivityLabel(props: Readonly<SensitivityLabelProps>) {

  const { label } = props;

  return (
    <Presenter label={label} />
  );

}

export default SensitivityLabel;

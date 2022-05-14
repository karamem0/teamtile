//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './presenter';

interface SensitivityLabelProps {
  sensitivityLabel: string | null | undefined
}

export default function SensitivityLabel ({
  sensitivityLabel
}: SensitivityLabelProps): React.ReactElement | null {

  return (
    <Presenter sensitivityLabel={sensitivityLabel} />
  );

}

//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Badge } from '@fluentui/react-components';

interface SensitivityLabelProps {
  value?: string
}

function SensitivityLabel(props: Readonly<SensitivityLabelProps>) {

  const { value } = props;

  return (
    value ? (
      <Badge appearance="tint">
        {value}
      </Badge>
    ) : null
  );

}

export default React.memo(SensitivityLabel);

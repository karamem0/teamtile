//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Label, Text } from '@fluentui/react-northstar';

interface SensitivityLabelProps {
  value?: string
}

function SensitivityLabel(props: SensitivityLabelProps) {

  const { value } = props;

  return (
    <Text>
      {
        value ? (
          <Label>
            <Text
              content={value}
              size="small" />
          </Label>
        ) : null
      }
    </Text>
  );

}

export default React.memo(SensitivityLabel);

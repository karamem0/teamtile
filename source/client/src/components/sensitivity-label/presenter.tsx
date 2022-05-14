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
  sensitivityLabel: string | null | undefined
}

export default React.memo(function SensitivityLabel ({
  sensitivityLabel
}: SensitivityLabelProps): React.ReactElement | null {

  return (
    <Text>
      {
        sensitivityLabel
          ? (
            <Label>
              <Text
                content={sensitivityLabel}
                size="small" />
            </Label>
            )
          : null
      }
    </Text>
  );

});

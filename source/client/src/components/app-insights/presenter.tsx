//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

interface AppInsightsProps {
  children: React.ReactNode
}

export default function AppInsights ({
  children
}: AppInsightsProps): React.ReactElement | null {

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

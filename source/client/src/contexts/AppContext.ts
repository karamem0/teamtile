//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Client } from '@microsoft/microsoft-graph-client';

const AppContext = React.createContext<[
  client?: Client,
  setClient?: React.Dispatch<React.SetStateAction<Client | undefined>>,
  error?: string,
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>
]>([]);

export default AppContext;

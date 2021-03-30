import React from 'react';

const AppContext = React.createContext<[
  token?: string,
  setToken?: React.Dispatch<React.SetStateAction<string | undefined>>,
  error?: string,
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>
]>([]);

export default AppContext;

//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { DrawerType } from '../../types/Drawer';

interface DrawerState {
  data?: unknown,
  type?: DrawerType
}

interface DrawerContextState {
  drawer?: DrawerState,
  setDrawer: React.Dispatch<React.SetStateAction<DrawerState | undefined>>
}

const DrawerContext = React.createContext<DrawerContextState | undefined>(undefined);

export const useDrawer = (): DrawerContextState => {
  const props = React.useContext(DrawerContext);
  if (props == null) {
    throw new Error('The context is not initialzed: DrawerContext');
  }
  return props;
};

function DrawerProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ state, setState ] = React.useState<DrawerState>();
  const value = React.useMemo(() => ({
    drawer: state,
    setDrawer: setState
  }), [
    state
  ]);

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  );

}

export default DrawerProvider;

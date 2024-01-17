//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../types/Event';

import Presenter from './SidePanel.presenter';

interface SidePanelProps {
  children?: React.ReactNode,
  content?: React.ReactNode,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: Readonly<SidePanelProps>) {

  const {
    children,
    content,
    title,
    onOpenChange
  } = props;

  const [ open, setOpen ] = React.useState<boolean>(false);

  const handleOpenChange = React.useCallback((e?: Event, data?: boolean) => {
    setOpen(data ?? false);
    onOpenChange?.(e, data);
  }, [ onOpenChange ]);

  return (
    <Presenter
      content={content}
      open={open}
      title={title}
      onOpenChange={handleOpenChange}>
      {children}
    </Presenter>
  );

}

export default SidePanel;

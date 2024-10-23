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

interface SidePanelRenderProps {
  onOpenChange?: EventHandler<boolean>
}

interface SidePanelProps {
  content?: React.ReactNode,
  loading?: boolean,
  renderer?: (props: SidePanelRenderProps) => React.ReactNode,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: Readonly<SidePanelProps>) {

  const {
    content,
    loading,
    renderer,
    title,
    onOpenChange
  } = props;

  const [ open, setOpen ] = React.useState<boolean>(false);

  const handleOpenChange = React.useCallback((event: Event, data?: boolean) => {
    setOpen(data ?? false);
    onOpenChange?.(event, data);
  }, [
    onOpenChange
  ]);

  return (
    <Presenter
      content={content}
      loading={loading}
      open={open}
      title={title}
      onOpenChange={handleOpenChange}>
      {
        renderer?.({ onOpenChange: handleOpenChange })
      }
    </Presenter>
  );

}

export default SidePanel;

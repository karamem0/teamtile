//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/Event';

import Presenter from './SidePanel.presenter';

interface SidePanelProps {
  content?: React.ReactNode,
  title?: React.ReactNode,
  trigger?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: SidePanelProps) {

  const {
    content,
    title,
    trigger,
    onOpenChange
  } = props;

  const [ open, setOpen ] = React.useState<boolean>(false);

  const handleOpenChange = React.useCallback((event, data?: boolean) => {
    setOpen(data || false);
    onOpenChange?.(event, data);
  }, [ onOpenChange ]);

  return (
    <Presenter
      content={content}
      open={open}
      title={title}
      trigger={trigger}
      onOpenChange={handleOpenChange} />
  );

}

export default SidePanel;

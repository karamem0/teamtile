//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion, AccordionToggleData } from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import Drawer from '../../../common/components/Drawer';
import { EventHandler } from '../../../types/Event';
import { Tag } from '../../../types/Entity';
import TagMemberAccordionItem from './TagMemberAccordionItem';
import { css } from '@emotion/react';
import messages from '../messages';

interface TagDrawerProps {
  id?: string,
  items?: Tag[],
  loading?: boolean,
  open?: boolean,
  openItems?: Tag[],
  onOpenChange?: EventHandler<boolean>,
  onToggle?: EventHandler<Tag[]>
}

function TagDrawer(props: Readonly<TagDrawerProps>) {

  const {
    id,
    items,
    loading,
    open,
    openItems,
    onOpenChange,
    onToggle
  } = props;

  const intl = useIntl();

  return (
    <Drawer
      loading={loading}
      open={open}
      title={intl.formatMessage(messages.Tags)}
      onOpenChange={onOpenChange}>
      {
        items ? (
          <div
            css={css`
              display: flex;
              flex-flow: column;
              gap: 0.5rem;
              height: calc(100vh - 5.5rem);
              overflow: auto;
            `}>
            <Accordion
              collapsible
              multiple
              onToggle={(event, data: AccordionToggleData<Tag>) => onToggle?.(event, data.openItems)}>
              {
                items.length > 0 ? items.map((item) => (
                  <TagMemberAccordionItem
                    key={item.id}
                    id={id}
                    open={openItems?.some((openItem) => openItem.id === item.id)}
                    tag={item} />
                )) : (
                  <div
                    css={css`
                      text-align: center;
                    `}>
                    <FormattedMessage {...messages.NoTagsFound} />
                  </div>
                )
              }
            </Accordion>
          </div>
        ) : null
      }
    </Drawer>
  );

}

export default React.memo(TagDrawer);

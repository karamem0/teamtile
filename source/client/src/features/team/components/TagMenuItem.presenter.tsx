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
import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import SidePanel from '../../../common/components/SidePanel';
import { Tag } from '../../../types/Entity';
import { Tag16Regular } from '@fluentui/react-icons';
import TagMemberAccordionItem from './TagMemberAccordionItem';
import { css } from '@emotion/react';
import messages from '../messages';

interface TagMenuItemProps {
  id?: string,
  items?: Tag[],
  loading?: boolean,
  openItems?: Tag[],
  onOpenChange?: EventHandler<boolean>,
  onToggle?: EventHandler<Tag[]>
}

function TagMenuItem(props: Readonly<TagMenuItemProps>) {

  const {
    id,
    items,
    loading,
    openItems,
    onOpenChange,
    onToggle
  } = props;

  const intl = useIntl();

  return (
    <SidePanel
      loading={loading}
      title={intl.formatMessage(messages.Tags)}
      content={
        items ? (
          <div
            css={css`
              display: flex;
              flex-flow: column;
              grid-gap: 0.5rem;
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
      renderer={
        ({ onOpenChange }) => (
          <CardMenuItem
            title={intl.formatMessage(messages.ViewTags)}
            icon={(
              <Tag16Regular />
            )}
            onClick={(event) => onOpenChange?.(event, true)} />
        )
      }
      onOpenChange={onOpenChange} />
  );

}

export default React.memo(TagMenuItem);

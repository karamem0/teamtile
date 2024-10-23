//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion, AccordionToggleData } from '@fluentui/react-components';
import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import SidePanel from '../../../common/components/SidePanel';
import { Tag } from '../../../types/Entity';
import { TagIcon } from '@fluentui/react-icons-mdl2';
import TagMemberAccordionItem from './TagMemberAccordionItem';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

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
                items.map((item) => (
                  <TagMemberAccordionItem
                    key={item.id}
                    id={id}
                    open={openItems?.some((openItem) => openItem.id === item.id)}
                    tag={item} />
                ))
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
              <TagIcon
                css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
            )}
            onClick={(event) => onOpenChange?.(event, true)} />
        )
      }
      onOpenChange={onOpenChange} />
  );

}

export default React.memo(TagMenuItem);

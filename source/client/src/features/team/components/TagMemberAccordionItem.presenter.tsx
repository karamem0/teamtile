//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Spinner,
  Text
} from '@fluentui/react-components';
import { Member, Tag } from '../../../types/Entity';
import AvatarIcon from './AvatarIcon';
import { css } from '@emotion/react';
import { useTheme } from '../../../providers/ThemeProvider';

interface TagMemberAccordionItemProps {
  loading?: boolean,
  members?: Member[],
  tag?: Tag
}

function TagMemberAccordionItem(props: Readonly<TagMemberAccordionItemProps>) {

  const {
    loading,
    members,
    tag
  } = props;

  const { theme } = useTheme();

  return tag ? (
    <AccordionItem value={tag}>
      <AccordionHeader
        css={css`
          &>button {
            padding: 0;
          }
        `}>
        {tag.displayName}
      </AccordionHeader>
      <AccordionPanel
        css={css`
          margin: 0;
        `}>
        {
          loading ? (
            <Spinner />
          ) : (
            members?.map((member) => (
              <Text
                key={member.id}
                css={css`
                  display: grid;
                  grid-template-columns: auto auto;
                  grid-gap: 0.5rem;
                  align-items: center;
                  justify-content: left;
                  padding: 0.5rem;
                  &:hover {
                    background-color: ${theme.colorNeutralBackground1Hover};
                  }
                `}>
                <AvatarIcon
                  icon={member.icon}
                  name={member.displayName}
                  size={24} />
                <Text truncate>
                  {member.displayName}
                </Text>
              </Text>
            ))
          )
        }
      </AccordionPanel>
    </AccordionItem>
  ) : null;

}

export default React.memo(TagMemberAccordionItem);

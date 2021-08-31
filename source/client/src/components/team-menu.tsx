//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Flex,
  Menu,
  MenuProps,
  Pill,
  Text
} from '@fluentui/react-northstar';
import { ContextMenuIcon, GroupIcon } from '@fluentui/react-icons-mdl2';
import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';
import { Team } from '../types/team';
import UserIcon from './user-icon';

interface TeamMenuProps {
  team?: Team
}

const TeamMenu = ({ team }: TeamMenuProps): React.ReactElement => {

  const [ memberMenu, setMemberMenu ] = React.useState<MenuProps>();
  const [ channelMenu, setChannelMenu ] = React.useState<MenuProps>();

  React.useEffect(() => {
    if (!team) {
      return;
    }
    const members = team?.members?.values;
    if (!members) {
      return;
    }
    setMemberMenu({
      className: 'card-submenu',
      items: members
        .slice(0, 10)
        .map((member, index) => ({
          className: 'card-submenu-item',
          content: (
            <Flex
              gap="gap.small"
              inline
              vAlign="center">
              <UserIcon
                id={member.id}
                name={member.name} />
              <Text content={member.name} />
            </Flex>
          ),
          key: index,
          onClick: () => {
            if (!member.email) {
              return;
            }
            microsoftTeams.executeDeepLink(
              'https://teams.microsoft.com/l/chat/0/0' +
                `?users=${member.email}`);
          }
        }))
        .concat({
          className: 'card-submenu-item',
          content: (
            <Pill
              appearance="outline"
              content="View all members" />
          ),
          key: -1,
          onClick: () => {
            if (!team?.id || !team?.internalId) {
              return;
            }
            microsoftTeams.executeDeepLink(
              'https://teams.microsoft.com/_#/teamDashboard' +
                `/${team.id}` +
                `/${team.internalId}` +
                '/td.members');
          }
        })
    });
  }, [ team ]);

  React.useEffect(() => {
    if (!team) {
      return;
    }
    const channels = team?.channels?.values;
    if (!channels) {
      return;
    }
    setChannelMenu({
      className: 'card-submenu',
      items: channels
        .slice(0, 10)
        .map((channel, index) => ({
          className: 'card-submenu-item',
          content: (
            <Text content={channel.name} />
          ),
          key: index,
          onClick: () => {
            if (!channel.url) {
              return;
            }
            microsoftTeams.executeDeepLink(channel.url);
          }
        }))
        .concat({
          className: 'card-submenu-item',
          content: (
            <Pill
              appearance="outline"
              content="View all channels" />
          ),
          key: -1,
          onClick: () => {
            if (!team || !team.id || !team.internalId) {
              return;
            }
            microsoftTeams.executeDeepLink(
              'https://teams.microsoft.com/_#/teamDashboard' +
            `/${team.id}` +
            `/${team.internalId}` +
            '/td.channels');
          }
        })
    });
  }, [ team ]);

  return (
    <Menu
      className="card-menu"
      iconOnly
      items={[
        {
          className: 'card-menu-item',
          content: (
            <Text
              className="card-menu-item-content"
              color="brand"
              content={
                team?.members?.count && (
                  <React.Fragment>
                    <Text content={team.members.count} />
                    {
                      team?.members?.nextLink && (
                        <Text content="+" />
                      )
                    }
                  </React.Fragment>
                )
              }
              size="small" />
          ),
          disabled: !team?.members,
          icon: (
            <Text color="brand">
              <GroupIcon className="card-menu-icon" />
            </Text>
          ),
          indicator: false,
          key: 1,
          menu: memberMenu
        },
        {
          className: 'card-menu-item',
          content: (
            <Text
              className="card-menu-item-content"
              color="brand"
              content={
                team?.channels?.count && (
                  <React.Fragment>
                    <Text content={team.channels.count} />
                    {
                      team?.channels.nextLink && (
                        <Text content="+" />
                      )
                    }
                  </React.Fragment>
                )
              }
              size="small" />
          ),
          disabled: !team?.channels,
          icon: (
            <Text color="brand">
              <ContextMenuIcon className="card-menu-icon" />
            </Text>
          ),
          indicator: false,
          key: 2,
          menu: channelMenu
        },
        {
          className: 'card-menu-item',
          disabled: !team?.drive,
          icon: (
            <Text color="brand">
              <SharepointLogoIcon className="card-menu-icon" />
            </Text>
          ),
          key: 3,
          onClick: () => {
            if (!team?.drive?.url) {
              return;
            }
            microsoftTeams.executeDeepLink(team.drive.url);
          }
        }
      ]} />
  );

};

export default TeamMenu;

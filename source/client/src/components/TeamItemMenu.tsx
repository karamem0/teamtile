import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Flex,
  Menu,
  MenuItemProps,
  Pill,
  Text
} from '@fluentui/react-northstar';
import {
  ContactGroupIcon,
  ContentIcon
} from '@fluentui/react-icons-northstar';
import { SharepointLogoIcon } from '@fluentui/react-icons';
import { Team } from '../types';
import UserIcon from './UserIcon';

interface TeamItemMenuProps {
  team?: Team;
}

const TeamItemMenu: React.FC<TeamItemMenuProps> = (props: TeamItemMenuProps) => {

  const { team } = props;

  const [ memberMenuItems, setMemberMenuItems ] = React.useState<MenuItemProps[]>();
  const [ channelMenuItems, setChannelMenuItems ] = React.useState<MenuItemProps[]>();

  React.useEffect(() => {
    if (!team?.members?.values) {
      return;
    }
    setMemberMenuItems(team.members
      .values
      .slice(0, 10)
      .map((member) => ({
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
        key: member.id,
        onClick: () => {
          if (!member.email) {
            return;
          }
          microsoftTeams.executeDeepLink(
            'https://teams.microsoft.com/l/chat/0/0' +
            `?users=${member.email}`);
        }
      } as MenuItemProps))
      .concat({
        className: 'grid-item-menu-item-view-all',
        content: (
          <Pill
            appearance="outline"
            content="View all members" />
        ),
        key: '00000000-0000-0000-0000-000000000000',
        onClick: () => {
          if (!team.id || !team.internalId) {
            return;
          }
          microsoftTeams.executeDeepLink(
            'https://teams.microsoft.com/_#/teamDashboard' +
            `/${team.id}` +
            `/${team.internalId}` +
            '/td.members');
        }
      } as MenuItemProps)
    );
  }, [ team ]);

  React.useEffect(() => {
    if (!team?.channels?.values) {
      return;
    }
    setChannelMenuItems(team.channels
      .values
      .slice(0, 10)
      .map((channel) => ({
        content: channel.name,
        key: channel.id,
        onClick: () => {
          if (!channel.url) {
            return;
          }
          microsoftTeams.executeDeepLink(channel.url);
        }
      } as MenuItemProps))
      .concat({
        className: 'grid-item-menu-item-view-all',
        content: (
          <Pill
            appearance="outline"
            content="View all channels" />
        ),
        key: '00000000-0000-0000-0000-000000000000',
        onClick: () => {
          if (!team.id || !team.internalId) {
            return;
          }
          microsoftTeams.executeDeepLink(
            'https://teams.microsoft.com/_#/teamDashboard' +
            `/${team.id}` +
            `/${team.internalId}` +
            '/td.channels');
        }
      } as MenuItemProps)
    );
  }, [ team ]);

  return (
    <Menu
      className="grid-item-menu"
      iconOnly
      items={[
        {
          className: 'grid-item-menu-item',
          content: (
            <Text
              className="grid-item-text-number"
              color="brand"
              content={
                team?.members &&
                  <React.Fragment>
                    <Text content={team.members.count} />
                    {
                      team.members.hasMore &&
                        <Text content="+" />
                    }
                  </React.Fragment>
              }
              size="small" />
          ),
          icon: (
            <Text color="brand">
              <ContactGroupIcon
                className="grid-item-icon"
                outline />
            </Text>
          ),
          disabled: !team?.members,
          indicator: false,
          menu: {
            items: memberMenuItems
          }
        },
        {
          className: 'grid-item-menu-item',
          content: (
            <Text
              className="grid-item-text-number"
              color="brand"
              content={
                team?.channels &&
                  <React.Fragment>
                    <Text content={team.channels.count} />
                    {
                      team.channels.hasMore &&
                        <Text content="+" />
                    }
                  </React.Fragment>
              }
              size="small" />
          ),
          icon: (
            <Text color="brand">
              <ContentIcon
                className="grid-item-icon"
                outline />
            </Text>
          ),
          disabled: !team?.channels,
          indicator: false,
          menu: {
            items: channelMenuItems
          }
        },
        {
          className: 'grid-item-menu-item',
          disabled: !team?.drive,
          icon: (
            <Text color="brand">
              <SharepointLogoIcon className="grid-item-icon" />
            </Text>
          ),
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

export default TeamItemMenu;

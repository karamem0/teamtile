import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Flex,
  Menu,
  MenuProps,
  Pill,
  Text
} from '@fluentui/react-northstar';
import {
  ContactGroupIcon,
  ContentIcon
} from '@fluentui/react-icons-northstar';
import { FabricNetworkFolderIcon } from '@fluentui/react-icons';
import {
  Team,
  TeamChannels,
  TeamDrive,
  TeamMembers
} from '../types';
import UserIcon from './UserIcon';

interface TeamMenuProps {
  team?: Team;
  channels?: TeamChannels;
  members?: TeamMembers;
  drive?: TeamDrive;
}

const TeamMenu: React.FC<TeamMenuProps> = (props: TeamMenuProps) => {

  const {
    team,
    channels,
    members,
    drive
  } = props;

  const [ memberMenu, setMemberMenu ] = React.useState<MenuProps>();
  const [ channelMenu, setChannelMenu ] = React.useState<MenuProps>();

  React.useEffect(() => {
    if (!members?.values) {
      return;
    }
    setMemberMenu({
      className: 'card-submenu',
      items: members
        .values
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
            if (!team || !team?.id || !team?.internalId) {
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
  }, [ team, members ]);

  React.useEffect(() => {
    if (!channels?.values) {
      return;
    }
    setChannelMenu({
      className: 'card-submenu',
      items: channels
        .values
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
  }, [ team, channels ]);

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
                members &&
                  <React.Fragment>
                    <Text content={members.count} />
                    {
                      members.nextLink &&
                        <Text content="+" />
                    }
                  </React.Fragment>
              }
              size="small" />
          ),
          disabled: !members,
          icon: (
            <Text color="brand">
              <ContactGroupIcon
                className="card-menu-icon"
                outline />
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
                channels &&
                  <React.Fragment>
                    <Text content={channels.count} />
                    {
                      channels.nextLink &&
                        <Text content="+" />
                    }
                  </React.Fragment>
              }
              size="small" />
          ),
          disabled: !channels,
          icon: (
            <Text color="brand">
              <ContentIcon
                className="card-menu-icon"
                outline />
            </Text>
          ),
          indicator: false,
          key: 2,
          menu: channelMenu
        },
        {
          className: 'card-menu-item',
          disabled: !drive,
          icon: (
            <Text color="brand">
              <FabricNetworkFolderIcon className="card-menu-icon" />
            </Text>
          ),
          key: 3,
          onClick: () => {
            if (!drive?.url) {
              return;
            }
            microsoftTeams.executeDeepLink(drive.url);
          }
        }
      ]} />
  );

};

export default TeamMenu;

import React from 'react';
import {
  Button,
  Flex,
  Grid,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { ContentIcon } from '@fluentui/react-icons-northstar';
import AppContext from '../contexts/AppContext';
import useTeamChannels from '../hooks/useTeamChannels';
import TeamChannelIcon from './TeamChannelIcon';

interface TeamChannelListProps {
  id?: string;
}

const TeamChannelList: React.FC<TeamChannelListProps> = (props: TeamChannelListProps) => {

  const { id } = props;
  const [ token ] = React.useContext(AppContext);
  const [ channels ] = useTeamChannels({ token, id });
  const [ popupOpen, setPopupOpen ] = React.useState<boolean>();

  return (
    <Popup
      content={
        <Grid>
          {
            popupOpen && (
              channels && channels.map((channel) =>
                <TeamChannelIcon
                  key={channel.id}
                  name={channel.name}
                  url={channel.url} />
              )
            )
          }
        </Grid>
      }
      position="above"
      trigger={
        <Button
          className="item-text-button"
          text>
          <Flex
            gap="gap.smaller"
            inline>
            <Text color="brand">
              <ContentIcon
                className="item-icon"
                outline />
              <Text
                className="item-number"
                content={channels?.length}
                size="small" />
            </Text>
          </Flex>
        </Button>
      }
      onOpenChange={(event, props) => {
        if (!props?.open) {
          return;
        }
        setPopupOpen(props.open);
      }} />
  );

};

export default TeamChannelList;

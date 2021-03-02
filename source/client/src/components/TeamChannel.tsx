import React from 'react';
import {
  Button,
  Flex,
  Grid,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { ContentIcon } from '@fluentui/react-icons-northstar';
import TokenContext from '../contexts/TokenContext';
import useTeamChannels from '../hooks/useTeamChannels';
import TeamChannelIcon from './TeamChannelIcon';

interface TeamChannelProps {
  id?: string;
}

const TeamChannel: React.FC<TeamChannelProps> = (props: TeamChannelProps) => {

  const { id } = props;
  const [ channels ] = useTeamChannels({
    token: React.useContext(TokenContext),
    id: id
  });
  const [ popupOpen, setPopupOpen ] = React.useState<boolean>();

  return (
    <Popup
      content={
        <Grid>
          {
            popupOpen
              ? (
                  channels
                    ? channels.map((channel) =>
                      <TeamChannelIcon
                        key={channel.id}
                        name={channel.name}
                        url={channel.url} />
                    )
                    : null
                )
              : null
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

export default TeamChannel;

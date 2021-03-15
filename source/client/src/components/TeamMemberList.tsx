import React from 'react';
import {
  Button,
  Flex,
  Grid,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { ContactGroupIcon } from '@fluentui/react-icons-northstar';
import AppContext from '../contexts/AppContext';
import useTeamMembers from '../hooks/useTeamMembers';
import TeamMemberIcon from './TeamMemberIcon';

interface TeamMemberListProps {
  id?: string;
}

const TeamMemberList: React.FC<TeamMemberListProps> = (props: TeamMemberListProps) => {

  const { id } = props;
  const [ token ] = React.useContext(AppContext);
  const [ members ] = useTeamMembers({ token, id });
  const [ popupOpen, setPopupOpen ] = React.useState<boolean>();

  return (
    <Popup
      content={
        <Grid>
          {
            popupOpen && (
              members && members.map((member) =>
                <TeamMemberIcon
                  email={member.email}
                  id={member.id}
                  key={member.id}
                  name={member.name} />
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
              <ContactGroupIcon
                className="item-icon"
                outline />
              <Text
                className="item-number"
                content={members?.length}
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

export default TeamMemberList;

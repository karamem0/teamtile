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
  Button,
  Card,
  Text
} from '@fluentui/react-northstar';
import { LockIcon, GlobeIcon } from '@fluentui/react-icons-mdl2';
import { useTeam } from '../hooks/use-team';
import TeamIcon from './team-icon';
import TeamMenu from './team-menu';

interface TeamCardProps {
  id: string
}

const TeamCard = ({ id }: TeamCardProps): React.ReactElement => {

  const [ team ] = useTeam({ id });

  return (
    <React.Fragment>
      {
        team &&
          <Card
            className="card"
            fluid>
            <div className="card-column">
              <div className="card-column-item">
                <TeamIcon
                  data={team.icon?.data}
                  name={team.name} />
              </div>
              <div className="card-column-item">
                <div className="card-row">
                  <Button
                    className="card-name"
                    content={team.name}
                    text
                    onClick={() => {
                      if (!team.url) {
                        return;
                      }
                      microsoftTeams.executeDeepLink(team.url);
                    }} />
                  <Text
                    className="card-description"
                    content={team.description}
                    size="small"
                    truncated />
                  <TeamMenu team={team} />
                </div>
              </div>
              <div className="card-column-item">
                <Text color="brand">
                  {
                    team.visibility === 'public' &&
                      <GlobeIcon className="card-menu-icon" />
                  }
                  {
                    team.visibility === 'private' &&
                      <LockIcon className="card-menu-icon" />
                  }
                </Text>
              </div>
            </div>
          </Card>
      }
    </React.Fragment>
  );

};

export default TeamCard;

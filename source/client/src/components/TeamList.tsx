import React from 'react';
import { Grid } from '@material-ui/core';
import { Loader } from '@fluentui/react-northstar';
import TokenContext from '../contexts/TokenContext';
import useJoinedTeams from '../hooks/useJoinedTeams';
import TeamItem from './TeamItem';

const TeamList: React.FC = () => {

  const [ teams ] = useJoinedTeams({
    token: React.useContext(TokenContext)
  });

  return (
    <React.Fragment>
      {
        teams
          ? teams.map((team) => (
            <Grid
              className="grid-item"
              item
              key={team.id}
              lg={4}
              md={6}
              sm={12}
              xl={3}
              xs={12}>
              <TeamItem
                description={team.description}
                id={team.id}
                name={team.name} />
            </Grid>
          ))
          : (
            <Grid
              className="grid-item"
              item
              xs={12}>
              <Loader label="Loading..." />
            </Grid>
            )
      }
    </React.Fragment>
  );

};

export default TeamList;

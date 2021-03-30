import React from 'react';
import { Grid } from '@material-ui/core';
import { Text } from '@fluentui/react-northstar';
import { RainIcon } from '@fluentui/react-icons';
import AppContext from '../contexts/AppContext';
import useTeams from '../hooks/useTeams';
import TeamItem from './TeamItem';
import Loading from './Loading';

const TeamList: React.FC = () => {

  const [ token, , , setError ] = React.useContext(AppContext);
  const [ teams, error ] = useTeams({ token });

  React.useEffect(() => {
    if (!setError) {
      return;
    }
    setError(error);
  }, [ setError, error ]);

  if (!teams) {
    return (
      <Loading />
    );
  }

  if (!teams.length) {
    return (
      <Grid
        className="grid-item"
        item
        xs={12}>
        <div className="grid-item-empty">
          <RainIcon className="grid-item-empty-icon" />
          <Text
            className="grid-item-empty-text"
            content="No items found." />
        </div>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {
        teams.map((team) =>
          <Grid
            className="grid-item"
            item
            key={team.id}
            lg={4}
            md={6}
            sm={12}
            xl={3}
            xs={12}>
            <TeamItem team={team} />
          </Grid>
        )
      }
    </React.Fragment>
  );

};

export default TeamList;

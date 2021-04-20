import React from 'react';
import AppContext from '../contexts/AppContext';
import useTeams from '../hooks/useTeams';
import LoaderPanel from './LoaderPanel';
import EmptyPanel from './EmptyPanel';
import TeamCard from './TeamCard';

const TeamPanel: React.FC = () => {

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
      <LoaderPanel />
    );
  }

  if (!teams.length) {
    return (
      <EmptyPanel />
    );
  }

  return (
    <div className="panel panel-grid">
      {
        teams.map((team) =>
          <TeamCard
            key={team.id}
            team={team} />
        )
      }
    </div>
  );

};

export default TeamPanel;

import React from 'react';
import { Text } from '@fluentui/react-northstar';
import { ErrorBadgeIcon } from '@fluentui/react-icons';

const Error: React.FC = () => {

  return (
    <div className="panel panel-center">
      <div className="center">
        <ErrorBadgeIcon className="panel-center-icon" />
        <Text
          className="panel-center-text"
          content="Something went wrong." />
      </div>
    </div>
  );

};

export default Error;

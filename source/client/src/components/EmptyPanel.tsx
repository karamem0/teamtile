import React from 'react';
import { Text } from '@fluentui/react-northstar';
import { RainIcon } from '@fluentui/react-icons';

const EmptyPanel: React.FC = () => {

  return (
    <div className="panel panel-center">
      <div className="center">
        <RainIcon className="panel-center-icon" />
        <Text
          className="panel-center-text"
          content="No items found." />
      </div>
    </div>
  );

};

export default EmptyPanel;

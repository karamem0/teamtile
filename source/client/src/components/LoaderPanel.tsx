import React from 'react';
import { Loader } from '@fluentui/react-northstar';

const LoaderPanel: React.FC = () => {

  return (
    <div className="panel panel-center">
      <Loader label="Loading..." />
    </div>
  );

};

export default LoaderPanel;

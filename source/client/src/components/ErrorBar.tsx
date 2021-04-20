import React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';
import AppContext from '../contexts/AppContext';

const ErrorBar: React.FC = () => {

  const [ , , error, setError ] = React.useContext(AppContext);

  return (
    <div className="error">
      <Alert
        content={error}
        dismissible
        icon={
          <ExclamationTriangleIcon />
        }
        variables={{ urgent: true }}
        onVisibleChange={() => {
          if (!setError) {
            return;
          }
          setError(undefined);
        }} />
    </div>
  );

};

export default ErrorBar;

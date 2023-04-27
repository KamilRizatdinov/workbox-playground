import React from 'react';
import {useMeta} from '../../contexts/Meta';

const VersionUpdateHandler = ({children}) => {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  let clientVersion = new String(process.env.VERSION).toString(); // webpack-defined
  const {serverVersion} = useMeta();

  console.log("CLIENT VERSION", clientVersion);
  console.log("SERVER VERSION", serverVersion);
  

  if (serverVersion && clientVersion && serverVersion !== clientVersion) {
    return (
      <div style={{background: "red", color: "white"}}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default VersionUpdateHandler;

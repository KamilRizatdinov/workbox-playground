
import React, {useContext} from 'react';

export const DEFAULT_STATE = {
  serverVersion: undefined,
};

const Context = React.createContext(DEFAULT_STATE);

const MetaProvider = ({
  children,
  serverVersion,
}) => {
  const state = {
    serverVersion,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export function useMeta(){
  return useContext(Context);
}

export default {
  Context,
  Provider: MetaProvider,
  Consumer: Context.Consumer,
};

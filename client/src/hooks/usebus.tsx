import React, {createContext, useContext, Context, useEffect, useState } from 'react';
import mitt from 'mitt';


type BusChildrenProps = {
  children: any
}
export const BusContext: Context<any> = createContext(null);

export default function useBus() {
  return useContext(BusContext);
}

export function useListener(name: string, fn: any) {
  const bus = useBus();
  useEffect(() => {
    bus.on(name, fn);
    return () => {
      bus.off(name, fn);
    }
  }, [bus, name, fn]);
}

export function Provider( {children}: BusChildrenProps ) {
  const [ bus ] = useState(() => mitt());
  return <BusContext.Provider value={bus}>{ children } </BusContext.Provider>
}
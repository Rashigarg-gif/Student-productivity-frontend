import { useEffect, useState } from 'react';

// `useEffect` is not invoked during server rendering, meaning
// we can use this to determine if we're on the server or not.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {

  //The issue was header, in web we have server side rendering and header in static rendering can create issues,
  //So when we have static rendering we switch the header to false on server side and back to true during hydration on client side using useEffect.
  //UseEffect only runs on client and not on server.
  
  const [value, setValue] = useState<S | C>(server);
  useEffect(() => {
    setValue(client);
  }, [client]);

  return value;
}

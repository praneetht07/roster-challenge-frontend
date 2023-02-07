import { useState } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

const RefereshContext = createContext({
  listRes: [],
  GetListAction: () => {},
});

export function useRefereshContext() {
  return useContext(RefereshContext);
}

export default function RefereshProvider({ children }) {
  const [listRes, setListRes] = useState([]);

  const GetListAction = useCallback(() => {
    fetch("https://roster-challenge-backend-production.up.railway.app/artist/list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListRes(data || []);
      });
  }, []);

  const value = useMemo(
    () => ({ listRes, GetListAction }),
    [listRes, GetListAction]
  );

  return (
    <RefereshContext.Provider value={value}>
      {children}
    </RefereshContext.Provider>
  );
}

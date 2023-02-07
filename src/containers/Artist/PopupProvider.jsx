import React, { useRef } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useDialog } from "src/hooks";
import PostPopup from "./PostPopup";

const PostContext = createContext({
  showPost: () => {},
  hidePost: () => {},
});

export function usePostContext() {
  return useContext(PostContext);
}

export default function PostPopupProvider({ children }) {
  const { open, openDialog, closeDialog } = useDialog();
  const paramsRef = useRef(null);

  const showPost = useCallback(
    (params) => {
      paramsRef.current = params || null;
      openDialog();
    },
    [openDialog]
  );

  const hidePost = useCallback(() => {
    paramsRef.current = null;
    closeDialog();
  }, [closeDialog]);

  const value = useMemo(() => ({ showPost, hidePost }), [hidePost, showPost]);

  return (
    <PostContext.Provider value={value}>
      {children}
      <PostPopup open={open} onClose={closeDialog} paramsRef={paramsRef} />
    </PostContext.Provider>
  );
}

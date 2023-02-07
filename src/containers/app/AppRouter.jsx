import React from "react";
import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PostPopupProvider from "../Artist/PopupProvider";
import RefereshProvider from "../Artist/RefereshProvider";
const ArtistList = React.lazy(() => import("../Artist/ArtistList"));

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          path="/artist"
          render={() => {
            return (
              <RefereshProvider>
                <PostPopupProvider>
                  <ArtistList />
                </PostPopupProvider>
              </RefereshProvider>
            );
          }}
        />

        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/artist" />;
          }}
        />
      </Switch>
    </Suspense>
  );
}

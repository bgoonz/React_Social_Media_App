import React, { useContext, useEffect } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import Page from "./Page";
import Post from "./Post";
import LoadingDotsIcon from "./LoadingDotsIcon";
import VerticalSpace from "./UI/VerticalSpace";
import { useImmer } from "use-immer";

function Home() {
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post(
          `/getHomeFeed`,
          { token: appState.user.token },
          { cancelToken: ourRequest.token }
        );
        setState((draft) => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (error) {
        console.log("There was a problem or the request was cancelled.", error);
      }
    }
    fetchData();

    return () => {
      ourRequest.cancel();
    };
  }, [appState.user.token, setState]);

  if (state.isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="Your Feed">
      {state.feed.length === 0 && (
        <>
          <h2 className="text-center">
            Hello <strong>{appState.user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">
            Your feed displays the latest posts from the people you follow. If
            you don&rsquo;t have any friends to follow, that&rsquo;s okay; you
            can use the &ldquo;Search&rdquo; feature in the top menu bar to find
            content written by people with similar interests and then follow
            them.
          </p>
        </>
      )}
      {state.feed.length > 0 && (
        <>
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <VerticalSpace amount={50} unit="px" />

          <div className="list-group">
            {state.feed.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </div>
          <VerticalSpace amount={50} unit="px" />
        </>
      )}
    </Page>
  );
}

export default Home;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { Link } from "react-router-dom";
function HeaderLoggedIn(props) {
  //app means appwide or global
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleLogout = () => {
    appDispatch({ type: "logout" });
  };
    function handleSearch( event ) {
        event.preventDefault()
        appDispatch({ type: "openSearch" })
}
  return (
    <div className="flex-row my-3 my-md-0">
          <a onClick={ handleSearch}  href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" alt="avatar" src={appState.user.avatar} />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;

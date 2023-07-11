import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function NoMatch() {
  let location = useLocation();
  return (
      <div id='no-match'>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to='/'>Home</Link>
    </div>
  );
}
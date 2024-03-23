import React from "react";
import { User } from "..";

interface Props {
  user: User | null;
}

export default function YourEntries(props: Props) {
  /* Declare Your Entries Var */
  var entries = 0;

  return (
    <div>
      {/* show  your entries when user is loggedin*/}
      {props.user === null ? <div></div> : <h4>Your Entries: {entries}</h4>}
    </div>
  );
}

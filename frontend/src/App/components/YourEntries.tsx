import React from "react";

interface Props {
  entries: number;
}

export default function YourEntries(props: Props) {
  return (
    <div>
      <h4>Your Entries: {props.entries}</h4>
    </div>
  );
}

import React from "react";

interface Props {
  name: string;
  price: number;
}

export default function BuyEntries(props: Props) {
  return (
    <div>
      <input id="qty" type="number" min="1" defaultValue="10" step="1" />
      <button type="submit">Buy</button>
    </div>
  );
}

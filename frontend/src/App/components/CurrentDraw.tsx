import React from "react";

interface Props {
  name: string;
  description: string;
  price: number;
  prizePool: number;
  closingIn: number;
}

export default function CurrentDraw(props: Props) {
  var formatedPrizePool = props.prizePool.toLocaleString();
  var formatedClosingIn = props.prizePool;
  return (
    <div>
      <div>
        <h4>Game Of The Week</h4>
      </div>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div>
        <h2> {formatedPrizePool}π</h2>
      </div>
      <div>
        <h4>Closing In: {formatedClosingIn}</h4>
      </div>
      <div>
        <button>PLAY</button>
      </div>
    </div>
  );
}

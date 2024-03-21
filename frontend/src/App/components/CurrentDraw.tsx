import React from "react";

interface Props {
  name: string;
  description: string;
  price: number;
  prizePool: number;
  closingIn: number;
  onClickBuy: () => void;
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

    /*
      <div
        style={{ margin: 16, paddingBottom: 16, borderBottom: "1px solid gray" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "33%", marginRight: 8 }}>
            <img
              style={{ width: "100%" }}
              src={props.pictureURL}
              alt={props.name}
            />
          </div>
  
          <div style={{ width: "66%" }}>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
          </div>
        </div>
  
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <strong>{props.price} Test-π</strong> <br />
          <button onClick={props.onClickBuy}>Order</button>
        </div>
  
        <span style={{ fontSize: "0.6em" }}>{props.pictureCaption}</span>
      </div> */
  );
}

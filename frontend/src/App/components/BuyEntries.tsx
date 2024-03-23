import React, { useState } from "react";
import { MyPaymentMetadata, User } from "..";

interface Props {
  user: User | null;
  name: string;
  price: number;
  onClose: () => void;
  orderProduct: (
    name: string,
    amount: number,
    paymentMetadata: MyPaymentMetadata
  ) => void;
}

export default function BuyEntries(props: Props) {
  var [quantity, setQuantity] = useState<number>(10);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  var totalPrice = quantity * props.price;

  const onClickBuy = () => {
    const memo = `${quantity} Lottery Entries`;
    const amount = quantity * props.price;
    const paymentMetadata = { userId: props.user, noOfTickets: quantity };
    props.orderProduct(memo, amount, paymentMetadata);
  };

  return (
    <div>
      <input
        id="qty"
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        step="1"
      />
      <div>Total: {totalPrice.toFixed(2)}π</div>
      <button id="buyEntries" onClick={onClickBuy}>
        PLAY
      </button>
      <button type="submit" onClick={props.onClose}>
        Close
      </button>
    </div>
  );
}

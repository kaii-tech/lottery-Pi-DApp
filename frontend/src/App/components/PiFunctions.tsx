import {
  User,
  AuthResult,
  axiosClient,
  MyPaymentMetadata,
  PaymentDTO,
  config,
} from "..";

interface Props {
  user: User | null;
  setUser: (user: User | null) => null;
  showModal: boolean;
  setShowModal: (showModal: boolean) => false;
}
/*
export const [user, setUser] = useState<User | null>(null);
export const [showModal, setShowModal] = useState<boolean>(false);
*/

export const signIn = async (props: Props) => {
  const scopes = ["username", "payments"];
  const authResult: AuthResult = await window.Pi.authenticate(
    scopes,
    onIncompletePaymentFound
  );
  signInUser(authResult, props);
  props.setUser(authResult.user);
};

export const signOut = (props: Props) => {
  props.setUser(null);
  signOutUser(props);
};

const signInUser = (authResult: AuthResult, props: Props) => {
  axiosClient.post("/user/signin", { authResult });
  return props.setShowModal(false);
};

const signOutUser = (props: Props) => {
  return axiosClient.get("/user/signout");
};

export const onModalClose = (props: Props) => {
  props.setShowModal(false);
};

export const orderProduct = async (
  memo: string,
  amount: number,
  paymentMetadata: MyPaymentMetadata,
  props: Props
) => {
  if (props.user === null) {
    return props.setShowModal(true);
  }
  const paymentData = { amount, memo, metadata: paymentMetadata };
  const callbacks = {
    onReadyForServerApproval,
    onReadyForServerCompletion,
    onCancel,
    onError,
  };
  const payment = await window.Pi.createPayment(paymentData, callbacks);
  console.log(payment);
};

const onIncompletePaymentFound = (payment: PaymentDTO) => {
  console.log("onIncompletePaymentFound", payment);
  return axiosClient.post("/payments/incomplete", { payment });
};

const onReadyForServerApproval = (paymentId: string) => {
  console.log("onReadyForServerApproval", paymentId);
  axiosClient.post("/payments/approve", { paymentId }, config);
};

const onReadyForServerCompletion = (paymentId: string, txid: string) => {
  console.log("onReadyForServerCompletion", paymentId, txid);
  axiosClient.post("/payments/complete", { paymentId, txid }, config);
};

const onCancel = (paymentId: string) => {
  console.log("onCancel", paymentId);
  return axiosClient.post("/payments/cancelled_payment", { paymentId });
};

const onError = (error: Error, payment?: PaymentDTO) => {
  console.log("onError", error);
  if (payment) {
    console.log(payment);
    // handle the error accordingly
  }
};

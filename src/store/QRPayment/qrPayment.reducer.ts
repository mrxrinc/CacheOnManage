/**
 * @module Reducer/QRPayment
 * @desc All QRPayment reducers
 */
import * as types from "./qrPayment.constants";

// Utilities
import * as R from "ramda";
import { Action } from "../../store/index.reducer";
import { PaymentResult } from "types/qrPayment";

export interface QRPaymentState {
  qrData: any;
  loading: boolean;
  paymentResult: PaymentResult;
  merchantName: string;
  termID: string;
}

export const initialState: QRPaymentState = {
  qrData: {},
  paymentResult: {} as PaymentResult,
  loading: false,
  merchantName: "",
  termID: "",
};

const reducer: React.Reducer<QRPaymentState, Action> = (
  state = initialState,
  action
) => {
  const update = R.merge<QRPaymentState>(state);
  switch (action.type) {
    case types.QRINQUIRY:
      return update({
        qrData: action.payload,
      });
    case types.QRPAYMENT:
      return update({
        paymentResult: action.payload,
      });
    case types.LOADING:
      return update({
        loading: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;

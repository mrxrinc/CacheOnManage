/**
 * @module Reducer/TransferMoney
 * @desc All TransferMoney reducers
 */
import * as types from "./transferMoney.constants";

// Utilities
import * as R from "ramda";
import { Action } from "store/index.reducer";

export interface TransferMoneyState {
  transactionResult: any;
  loading: boolean;
}

export const initialState: TransferMoneyState = {
  transactionResult: {},
  loading: false,
};

const reducer: React.Reducer<TransferMoneyState, Action> = (
  state = initialState,
  action
) => {
  const update = R.merge<TransferMoneyState>(state);
  switch (action.type) {
    case types.TRANSFER_MONEY:
      return update({
        transactionResult: action.payload,
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

/**
 * @module Reducer/Invoice
 * @desc All Invoice reducers
 */
import * as types from "./invoice.constants";

// Utilities
import * as R from "ramda";
import { Action } from "store/index.reducer";

export interface InvoiceState {
  invoiceList: any[];
  loading: boolean;
}

export const initialState: InvoiceState = {
  invoiceList: [],
  loading: false,
};

const reducer: React.Reducer<InvoiceState, Action> = (
  state = initialState,
  action
) => {
  const update = R.merge<InvoiceState>(state);
  switch (action.type) {
    case types.INVOICE_LIST:
      return update({
        invoiceList: action.payload,
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

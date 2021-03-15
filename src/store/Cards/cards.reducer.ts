/**
 * @module Reducer/QRPayment
 * @desc All QRPayment reducers
 */
import * as types from "./cards.constants";

// Utilities
import * as R from "ramda";
import { Action } from "../../store/index.reducer";

export interface CardsState {
  callCardsInfo: String;
}

export const initialState: CardsState = {
  callCardsInfo: "",
};

const reducer: React.Reducer<CardsState, Action> = (
  state = initialState,
  action
) => {
  const update = R.merge<CardsState>(state);
  switch (action.type) {
    case types.CALLCARTINFO:
      return update({
        callCardsInfo: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;

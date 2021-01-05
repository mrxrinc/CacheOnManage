/**
 * @module Reducer/Saving
 * @desc All Saving reducers
 */
import * as types from "./saving.constants";

// Utilities
import * as R from "ramda";
import { Action } from "store/index.reducer";
import { SavingListData, SelectedTargetsData } from "types/saving";

export interface SavingState {
  savingList: SavingListData[];
  selectedTargetsData: SelectedTargetsData;
  loading: boolean;
  transferMoneyToTargetTransactionResult: any;
  showEditModal: boolean;
}

export const initialState: SavingState = {
  savingList: [],
  selectedTargetsData: {} as SelectedTargetsData,
  loading: false,
  transferMoneyToTargetTransactionResult: {},
  showEditModal: false,
};

const reducer: React.Reducer<SavingState, Action> = (
  state = initialState,
  action
) => {
  const update = R.merge<SavingState>(state);
  switch (action.type) {
    case types.SAVING_LIST:
      return update({
        savingList: action.payload,
      });
    case types.SELECTED_TARGETS_DATA:
      return update({
        selectedTargetsData: action.payload,
      });
    case types.DELETE_TARGET:
      return {
        ...state,
      };
    case types.LOADING:
      return update({
        loading: action.payload,
      });
    case types.TRANSFER_MONEY_TO_TARGET:
      return update({
        transferMoneyToTargetTransactionResult: action.payload,
      });
    case types.SET_EDIT_MODAL:
      return update({
        showEditModal: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;

import {
  DELETE_TARGET,
  SELECTED_TARGETS_DATA,
  SAVINGS_DATA,
} from "redux/actions/ActionTypes";

const initialState = {
  selectedTargetsData: [],
  savingData: [],
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case SELECTED_TARGETS_DATA:
      return { ...state, selectedTargetData: action.payload };
    case SAVINGS_DATA:
      return { ...state, savingData: action.payload };
    case DELETE_TARGET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

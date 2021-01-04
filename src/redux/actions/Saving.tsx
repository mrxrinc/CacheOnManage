import {
  SELECTED_TARGETS_DATA,
  DELETE_TARGET,
  SAVINGS_DATA,
} from "redux/actions/ActionTypes";

export const getSavingData = (data: any) => {
  return {
    type: SAVINGS_DATA,
    payload: data,
  };
};
export const getTargetsData = (data: any) => {
  return {
    type: SELECTED_TARGETS_DATA,
    payload: data,
  };
};

export const deleteTarget = (id: number) => {
  return {
    type: DELETE_TARGET,
    payload: id,
  };
};

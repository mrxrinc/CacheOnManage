/**
 * @module Actions/Saving
 * @desc All saving actions
 */
import * as types from "./saving.constants";
import { Action } from "store/index.reducer";
import { DeleteTarget } from "types/saving";

export interface ExtraActionInfo {
  sagas: boolean | undefined;
}

class Actions {
  /**
   * fetch saving list data
   * @param {ExtraActionInfo}
   * @return {Action<SavingListData>}
   */

  public setSavingsDataList(data: any, options?: ExtraActionInfo): Action<any> {
    return {
      type: options?.sagas ? types.SAGAS_SAVING_LIST : types.SAVING_LIST,
      payload: data,
    };
  }

  public getTargetsData(data: any, options?: ExtraActionInfo): Action<any> {
    return {
      type: options?.sagas
        ? types.SAGAS_SELECTED_TARGETS_DATA
        : types.SELECTED_TARGETS_DATA,
      payload: data,
    };
  }

  public deleteTarget(
    data: DeleteTarget,
    options?: ExtraActionInfo
  ): Action<DeleteTarget> {
    return {
      type: options?.sagas ? types.SAGAS_DELETE_TARGET : types.DELETE_TARGET,
      payload: data,
    };
  }
  public transferMoneyToTarget(
    data: any,
    options?: ExtraActionInfo
  ): Action<any> {
    return {
      type: options?.sagas
        ? types.SAGAS_TRANSFER_MONEY_TO_TARGET
        : types.TRANSFER_MONEY_TO_TARGET,
      payload: data,
    };
  }
  public setLoading(status: boolean): Action<boolean> {
    return {
      type: types.LOADING,
      payload: status,
    };
  }
  public setEditModal(status: boolean): Action<boolean> {
    return {
      type: types.SET_EDIT_MODAL,
      payload: status,
    };
  }
  public setChildTargets(data: any, options?: ExtraActionInfo): Action<any> {
    return {
      type: options?.sagas
        ? types.SAGAS_SET_CHILD_TARGETS
        : types.SET_CHILD_TARGETS,
      payload: data,
    };
  }
}
const SavingActions = new Actions();

export default SavingActions;

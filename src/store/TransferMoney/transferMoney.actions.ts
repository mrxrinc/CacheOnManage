/**
 * @module Actions/TransferMoney
 * @desc All transfer money actions
 */
import * as types from "./transferMoney.constants";
import { Action } from "store/index.reducer";

export interface ExtraActionInfo {
  sagas: boolean | undefined;
}

class Actions {
  /**
   * transfer money
   * @param {ExtraActionInfo}
   * @return {Action<TransferMoney>}
   */

  public transferMoney(data: any, options?: ExtraActionInfo): Action<any> {
    return {
      type: options?.sagas ? types.SAGAS_TRANSFER_MONEY : types.TRANSFER_MONEY,
      payload: data,
    };
  }

  public setLoading(status: boolean): Action<boolean> {
    return {
      type: types.LOADING,
      payload: status,
    };
  }
}
const TransferMoneyActions = new Actions();

export default TransferMoneyActions;

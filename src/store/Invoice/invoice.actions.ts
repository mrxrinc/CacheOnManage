/**
 * @module Actions/Invoice
 * @desc All invoice actions
 */
import * as types from "./invoice.constants";
import { Action } from "store/index.reducer";

export interface ExtraActionInfo {
  sagas: boolean | undefined;
}

class Actions {
  /**
   * fetch invoice list data
   * @param {ExtraActionInfo}
   * @return {Action<InvoiceListData>}
   */

  public getInvoiceList(data: any, options?: ExtraActionInfo): Action<any> {
    return {
      type: options?.sagas ? types.SAGAS_INVOICE_LIST : types.INVOICE_LIST,
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
const InvoiceActions = new Actions();

export default InvoiceActions;

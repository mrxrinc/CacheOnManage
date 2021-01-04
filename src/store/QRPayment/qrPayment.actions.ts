/**
 * @module Actions/QRPayment
 * @desc All saving actions
 */
import * as types from "./qrPayment.constants";
import { Action } from "../../store/index.reducer";
import { QrPayment } from "types/qrPayment";

export interface ExtraActionInfo {
  sagas: boolean | undefined;
}

class Actions {

  public getQrInquiry(data: string, options?: ExtraActionInfo): Action<string> {
    return {
      type: options?.sagas ? types.SAGAS_QRINQUIRY : types.QRINQUIRY,
      payload: data,
    };
  }
  
  public setQrPayment(data: QrPayment, options?: ExtraActionInfo): Action<QrPayment> {
    return {
      type: options?.sagas ? types.SAGAS_QRPAYMENT : types.QRPAYMENT,
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
const QRPaymentActions = new Actions();

export default QRPaymentActions;

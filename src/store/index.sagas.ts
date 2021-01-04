import { all, fork } from "redux-saga/effects";
// Sagas entities
//import UserSagas from "./User/user.sagas";
import SavingSagas from "./Saving/saving.sagas";
import InvoiceSagas from "./Invoice/invoice.sagas";
import QRPaymentSagas from "./QRPayment/qrPayment.sagas";
import MobileBillPayment from "./QuickAccess/quickAccess.sagas";
import TransferMoneySagas from "./TransferMoney/transferMoney.sagas";

/**
 * rootSaga
 * In this case, we need to merge all redux-saga sagas together to observe all dispatched actions.
 */
export default function* root() {
  return yield all([
    fork(SavingSagas),
    fork(QRPaymentSagas),
    fork(MobileBillPayment),
    fork(InvoiceSagas),
    fork(TransferMoneySagas),
  ]);
}

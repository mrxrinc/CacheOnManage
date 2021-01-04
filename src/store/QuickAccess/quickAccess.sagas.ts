import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./quickAccess.constants";
// Services
import MobileBillService from "../../services/http/endpoints/quickAccess/mobileBillPayment";
import MobileTopUpService from "../../services/http/endpoints/quickAccess/mobileBillTopUp";
// Types
import { Action } from "../../store/index.reducer";
import {
  setMobileBillPayment,
  setMobileTopUpPayment,
} from "./quickAccess.actions";

function* fetchMobileBillPayment(action: Action) {
  try {
    console.log("setMobileBillPayment>> is", action.payload);
    const mobileBillPaymentResultRes = yield call(
      MobileBillService.fetchMobileBillPayment.bind(MobileBillService),
      action.payload
    );
    yield put(
      setMobileBillPayment(mobileBillPaymentResultRes, {
        sagas: false,
      })
    );
  } catch (error) {
    console.log(
      "DEBUG: function*setMobileBillPayment -> error",
      error.response
    );
  }
}
function* fetchMobileTopUpPayment(action: Action) {
  try {
    console.log("fetchMobileTopUpPayment>> is", action.payload);
    const mobileTopUpPaymentResultRes = yield call(
      MobileTopUpService.fetchMobileTopUpPayment.bind(MobileTopUpService),
      action.payload
    );
    yield put(
      setMobileTopUpPayment(mobileTopUpPaymentResultRes, {
        sagas: false,
      })
    );
  } catch (error) {
    console.log(
      "DEBUG: function*fetchMobileTopUpPayment -> error",
      error.response
    );
  }
}
export default function* networkListeners() {
  console.log("networkListeners called");
  yield all([
    takeLatest(types.SAGAS_BILLPAYMNET, fetchMobileBillPayment),
    takeLatest(types.QUICKACCESS_SAGAS_MOBILETOPUP, fetchMobileTopUpPayment),
  ]);
}

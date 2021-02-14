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
    const mobileBillPaymentResultRes = yield call(
      MobileBillService.fetchMobileBillPayment.bind(MobileBillService),
      action.payload
    );
    yield put(
      setMobileBillPayment(
        //@ts-ignore
        { data: mobileBillPaymentResultRes, hasError: false },
        {
          sagas: false,
        }
      )
    );
  } catch (error) {
    if (error.response.data.details) {
      yield put(
        setMobileBillPayment(
          //@ts-ignore
          { data: error.response.data.details, hasError: true },
          {
            sagas: false,
          }
        )
      );
    }
  }
}
function* fetchMobileTopUpPayment(action: Action) {
  try {
    const mobileTopUpPaymentResultRes = yield call(
      MobileTopUpService.fetchMobileTopUpPayment.bind(MobileTopUpService),
      action.payload
    );
    yield put(
      setMobileTopUpPayment(
        //@ts-ignore
        { data: mobileTopUpPaymentResultRes, hasError: false },
        { sagas: false }
      )
    );
  } catch (error) {
    if (error.response.data.details) {
      yield put(
        setMobileTopUpPayment(
          //@ts-ignore
          { data: error.response.data.details, hasError: true },
          { sagas: false }
        )
      );
    }
  }
}
export default function* networkListeners() {
  yield all([
    takeLatest(types.SAGAS_BILLPAYMNET, fetchMobileBillPayment),
    takeLatest(types.QUICKACCESS_SAGAS_MOBILETOPUP, fetchMobileTopUpPayment),
  ]);
}

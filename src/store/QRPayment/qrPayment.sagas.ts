/**
 * @module Sagas/QRPayment
 * @desc All QRPayment sagas
 */
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./qrPayment.constants";
// Services
import QRPaymentService from "../../services/http/endpoints/qrPayment";
// Types
import { Action } from "../../store/index.reducer";
import QRPaymentActions from "./qrPayment.actions";

function* fetchQrInquiry(action: Action) {
  try {
    yield put(QRPaymentActions.setLoading(true));
    const qrRes = yield call(
      QRPaymentService.fetchQrInquiry.bind(QRPaymentService),
      action.payload
    );

    yield put(
      QRPaymentActions.getQrInquiry(qrRes, {
        sagas: false,
      })
    );

    yield put(QRPaymentActions.setLoading(false));
  } catch (error) {
    yield put(QRPaymentActions.setLoading(false));
  }
}

function* fetchQrPayment(action: Action) {
  try {
    yield put(QRPaymentActions.setLoading(true));
    const qrPaymentResultRes = yield call(
      QRPaymentService.fetchQrPayment.bind(QRPaymentService),
      action.payload
    );

    yield put(
      QRPaymentActions.setQrPayment(
        { data: qrPaymentResultRes, hasError: false },
        {
          sagas: false,
        }
      )
    );

    yield put(QRPaymentActions.setLoading(false));
  } catch (error) {
    if (error.response.data.details) {
      yield put(
        QRPaymentActions.setQrPayment(
          {
            data: error.response.data.details,
            hasError: true,
            message: error.response.data.message,
          },
          {
            sagas: false,
          }
        )
      );
    }
    yield put(QRPaymentActions.setLoading(false));
  }
}

export default function* networkListeners() {
  yield all([
    takeLatest(types.SAGAS_QRINQUIRY, fetchQrInquiry),
    takeLatest(types.SAGAS_QRPAYMENT, fetchQrPayment),
  ]);
}

/**
 * @module Sagas/TransferMoney
 * @desc All TransferMoney sagas
 */
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./transferMoney.constants";
// Actions
import TransferMoneyActions from "./transferMoney.actions";
// Services
import TransferMoneyService from "services/http/endpoints/transferMoney";
// Types
import { Action } from "store/index.reducer";

function* fetchTransferMoney(action: Action) {
  try {
    yield put(TransferMoneyActions.setLoading(true));
    const transferMoneyRes = yield call(
      TransferMoneyService.transferMoney.bind(TransferMoneyService),
      action.payload
    );
    yield put(
      TransferMoneyActions.transferMoney(
        { data: transferMoneyRes, hasError: false },
        {
          sagas: false,
        }
      )
    );

    yield put(TransferMoneyActions.setLoading(false));
  } catch (error) {
    if (error.response.data.details) {
      yield put(
        TransferMoneyActions.transferMoney(
          { data: error.response.data.details, hasError: true },
          {
            sagas: false,
          }
        )
      );
    }
    yield put(TransferMoneyActions.setLoading(false));
  } finally {
    yield put(TransferMoneyActions.setLoading(false));
  }
}

export default function* networkListeners() {
  yield all([takeLatest(types.SAGAS_TRANSFER_MONEY, fetchTransferMoney)]);
}

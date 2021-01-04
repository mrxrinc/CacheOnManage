/**
 * @module Sagas/Invoice
 * @desc All Invoice sagas
 */
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./invoice.constants";
// Actions
import InvoiceActions from "./invoice.actions";
// Services
import InvoiceService from "services/http/endpoints/invoice";
// Types
import { Action } from "store/index.reducer";

function* fetchInvoiceList(action: Action) {
  try {
    yield put(InvoiceActions.setLoading(true));
    const invoiceListRes = yield call(
      InvoiceService.fetchInvoiceList.bind(InvoiceService)
    );

    yield put(
      InvoiceActions.getInvoiceList(invoiceListRes, {
        sagas: false,
      })
    );

    yield put(InvoiceActions.setLoading(false));
  } catch (error) {
    console.log("DEBUG: function*fetchInvoiceList -> error", error.response);
    yield put(InvoiceActions.setLoading(false));
  }
}

export default function* networkListeners() {
  yield all([takeLatest(types.SAGAS_INVOICE_LIST, fetchInvoiceList)]);
}

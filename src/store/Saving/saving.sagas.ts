/**
 * @module Sagas/Saving
 * @desc All Saving sagas
 */
import { all, call, put, takeLatest, select, delay } from "redux-saga/effects";
import * as types from "./saving.constants";
import * as R from "ramda";
// Actions
import SavingActions from "./saving.actions";
// Services
import SavingService from "services/http/endpoints/saving";
// Types
import { Action } from "store/index.reducer";
import { AddTarget, DeleteTarget, TargetsData } from "types/saving";

function* fetchSavingList(action: Action) {
  try {
    yield put(SavingActions.setLoading(true));
    const savingListRes = yield call(
      SavingService.fetchSavingList.bind(SavingService)
    );
    // if (!savingListRes) {
    // TODO: should set error text
    // } else {
    yield put(
      SavingActions.setSavingsDataList(savingListRes, {
        sagas: false,
      })
    );
    // }
    yield put(SavingActions.setLoading(false));
  } catch (error) {
    yield put(SavingActions.setLoading(false));
  }
}
function* fetchTransfetMoneyTransaction(action: Action) {
  try {
    yield put(SavingActions.setLoading(true));
    const transferMoneyTransactionRes = yield call(
      SavingService.transferMoneyToTarget.bind(SavingService),
      action.payload
    );
    yield put(
      SavingActions.transferMoneyToTarget(
        { data: transferMoneyTransactionRes, hasError: false },
        {
          sagas: false,
        }
      )
    );
    const savingListRes = yield call(
      SavingService.fetchSavingList.bind(SavingService)
    );
    yield put(
      // @ts-ignore
      SavingActions.setSavingsDataList(savingListRes, {
        sagas: false,
      })
    );

    yield put(SavingActions.setLoading(false));
  } catch (error) {
    if (error.response.data.details) {
      yield put(
        SavingActions.transferMoneyToTarget(
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

    yield put(SavingActions.setLoading(false));
  } finally {
    yield put(SavingActions.setLoading(false));
  }
}
function* deleteTarget(action: Action<DeleteTarget>) {
  try {
    yield put(SavingActions.setLoading(true));
    yield call(
      //@ts-ignore
      SavingService.deleteTarget.bind(SavingService),
      action.payload?.targetId
    );
    yield put(
      SavingActions.deleteTarget(action.payload!, {
        sagas: false,
      })
    );
    yield put(SavingActions.setLoading(false));
  } catch (error) {
    yield put(SavingActions.setLoading(false));
  }
}

function* addTarget(action: Action<AddTarget | TargetsData>) {
  try {
    yield put(SavingActions.setLoading(true));
    yield call(
      SavingService.addTarget.bind(SavingService),
      action.payload as AddTarget
    );
    const savingListRes = yield call(
      SavingService.fetchSavingList.bind(SavingService)
    );
    yield put(
      // @ts-ignore
      SavingActions.setSavingsDataList(savingListRes, { sagas: false })
    );
    yield put(SavingActions.setLoading(false));
  } catch (error) {
    yield put(SavingActions.setLoading(false));
  }
}

function* finishTarget(action: Action<number>) {
  try {
    yield put(SavingActions.setLoading(true));
    yield call(
      SavingService.finishTarget.bind(SavingService),
      action.payload as number
    );

    const savingListRes = yield call(
      SavingService.fetchSavingList.bind(SavingService)
    );
    yield put(
      // @ts-ignore
      SavingActions.setSavingsDataList(savingListRes, {
        sagas: false,
      })
    );
    yield put(SavingActions.setLoading(false));
  } catch (error) {
    yield put(SavingActions.setLoading(false));
  }
}

function* updateTarget(action: Action<AddTarget>) {
  try {
    yield put(SavingActions.setLoading(true));
    yield call(
      SavingService.updateTarget.bind(SavingService),
      action.payload as AddTarget
    );

    const savingListRes = yield call(
      SavingService.fetchSavingList.bind(SavingService)
    );
    yield put(
      // @ts-ignore
      SavingActions.setSavingsDataList(savingListRes, {
        sagas: false,
      })
    );
    yield put(SavingActions.setLoading(false));
  } catch (error) {
    yield put(SavingActions.setLoading(false));
  }
}

export default function* networkListeners() {
  yield all([
    takeLatest(types.SAGAS_SAVING_LIST, fetchSavingList),
    takeLatest(types.SAGAS_ADD_TARGET, addTarget),
    takeLatest(types.SAGAS_FINISH_TARGET, finishTarget),
    takeLatest(types.SAGAS_DELETE_TARGET, deleteTarget),
    takeLatest(types.SAGAS_UPDATE_TARGET, updateTarget),
    takeLatest(
      types.SAGAS_TRANSFER_MONEY_TO_TARGET,
      fetchTransfetMoneyTransaction
    ),
  ]);
}

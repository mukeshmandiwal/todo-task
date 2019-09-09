import { takeLatest, all, fork } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
  requestNewTask,
  requestTasksDetails,
  requestTasksEdit,
  requestDeletedTask,
  requestStatusUpdate
} from "./tasks";

function* watchCommonRequest() {
  yield takeLatest(actionTypes.REQUEST_NEW_TASK, requestNewTask);
  yield takeLatest(actionTypes.REQUEST_TASK_LIST, requestTasksDetails);
  yield takeLatest(actionTypes.REQUEST_EDIT_TASK, requestTasksEdit);
  yield takeLatest(actionTypes.REQUEST_DELETE_TASK, requestDeletedTask);
  yield takeLatest(actionTypes.REQUEST_UPDATE_STATUS, requestStatusUpdate);
}

export function* rootSaga() {
  yield all([fork(watchCommonRequest)]);
}

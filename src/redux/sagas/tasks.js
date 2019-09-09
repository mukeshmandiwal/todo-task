import * as actionType from "../actions/actionTypes";
import { put } from "redux-saga/effects";
import axios from "axios";
export function* getDetails(action) {}

export function* requestNewTask(action) {
  const data = {
    taskType: action.taskType,
    title: action.title,
    details: action.details,
    dueDate: action.dueDate,
    statusTask: action.statusTask
  };
  try {
    yield put({
      type: actionType.NEW_TASK_LOADING
    });
    const response = yield axios.post(
      "https://todo-app-e0908.firebaseio.com/task.json",
      data
    );
    yield put({
      type: actionType.NEW_TASK_DETAILS,
      payload: response.data
    });
    yield put({
      type: actionType.REQUEST_TASK_LIST
    });
  } catch (error) {}
}

export function* requestTasksDetails(action) {
  try {
    yield put({
      type: actionType.TASK_LIST_LOADING
    });
    const response = yield axios.get(
      "https://todo-app-e0908.firebaseio.com/task.json"
    );
    yield put({
      type: actionType.TASK_LIST_DETAILS,
      payload: response.data
    });
  } catch (error) {}
}

export function* requestTasksEdit(action) {
  yield action.firebase.taskId(action.id).set({
    taskType: {
      taskType: action.fields.taskType,
      title: action.fields.title,
      details: action.fields.details,
      dueDate: action.fields.dueDate,
      statusTask: action.fields.statusTask
    }
  });
  yield put({
    type: actionType.REQUEST_TASK_LIST
  });
}

export function* requestStatusUpdate(action) {
  yield action.firebase.taskId(action.id).set({
    taskType: {
      taskType: action.taskType,
      title: action.title,
      details: action.details,
      dueDate: action.dueDate,
      statusTask: action.updatedStatus
    }
  });
  yield put({
    type: actionType.REQUEST_TASK_LIST
  });
}

export function* requestDeletedTask(action) {
  yield action.firebase.taskId(action.id).remove();
  yield put({
    type: actionType.REQUEST_TASK_LIST
  });
}

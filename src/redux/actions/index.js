import * as actionTypes from "./actionTypes";

export const getTaskDetails = () => ({
  type: actionTypes.REQUEST_TASK_LIST
});

export const createNewTask = (
  taskType,
  title,
  details,
  dueDate,
  statusTask
) => ({
  type: actionTypes.REQUEST_NEW_TASK,
  taskType,
  title,
  details,
  dueDate,
  statusTask
});

export const reqUpdateTask = (firebase, id, fields) => ({
  type: actionTypes.REQUEST_EDIT_TASK,
  firebase,
  id,
  fields
});

export const reqDeleteTask = (firebase, id) => ({
  type: actionTypes.REQUEST_DELETE_TASK,
  firebase,
  id
});

export const reqChangedStatus = (
  updatedStatus,
  taskType,
  title,
  details,
  dueDate,
  id,
  firebase
) => ({
  type: actionTypes.REQUEST_UPDATE_STATUS,
  updatedStatus,
  taskType,
  title,
  details,
  dueDate,
  id,
  firebase
});

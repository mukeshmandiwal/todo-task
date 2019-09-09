import * as actionType from "../actions/actionTypes";
const initialState = {
  taskLoader: false
};
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TASK_LIST_LOADING:
      return {
        ...state,
        taskLoader: true
      };
    case actionType.TASK_LIST_DETAILS:
      return {
        ...state,
        taskLoader: false,
        taskListDetails: action.payload
      };
    default:
      return state;
  }
};

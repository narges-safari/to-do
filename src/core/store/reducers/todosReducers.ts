import { Action, ActionTypes } from "../actions/types";
import { Todo } from "../actions/todoActions";

function todoReducer(state: Todo[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.FETCH_TASKS:
      return action.payload;
    case ActionTypes.ADD_TASK:
      state.push(action.payload);
      return { ...state };
    case ActionTypes.DELETE_TASK:
      return { ...state };
    default:
      return state;
  }
}

export default todoReducer;

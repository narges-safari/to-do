import { combineReducers } from "redux";

import todosReducer from "./todosReducers";
import { Todo } from "../actions/todoActions";

export interface storeState {
  todos: Todo[];
}

export default combineReducers<storeState>({
  todos: todosReducer,
});

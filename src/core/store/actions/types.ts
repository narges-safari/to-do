import {
  FetchTasksAction,
  AddTaskkAction,
  DeleteTaskAction,
} from "./todoActions";

export enum ActionTypes {
  FETCH_TASKS,
  ADD_TASK,
  DELETE_TASK,
}

export type Action = FetchTasksAction | AddTaskkAction | DeleteTaskAction;

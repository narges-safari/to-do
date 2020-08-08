import apiRequester from "../../api/apiRequester";
import { Dispatch } from "redux";

import { ActionTypes } from "./types";

export interface Todo {
  _id: string;
  title: string;
  desc: string;
  type: number;
  __v: number;
}

export interface FetchTasksAction {
  type: ActionTypes.FETCH_TASKS;
  payload: Todo[];
}

export interface AddTaskkAction {
  type: ActionTypes.ADD_TASK;
  payload: Todo;
}

export interface DeleteTaskAction {
  type: ActionTypes.DELETE_TASK;
}

export const fetchTasks = () => async (dispatch: Dispatch) => {
  const response = await apiRequester().get<Todo[]>("/tasks");
  dispatch<FetchTasksAction>({
    type: ActionTypes.FETCH_TASKS,
    payload: response.data,
  });
  return response;
};

interface addTaskType {
  title: string;
  desc: string;
  type: number;
}

export const addTask = (data: addTaskType) => async (dispatch: Dispatch) => {
  const response = await apiRequester().post<Todo>("/tasks", data);

  dispatch<AddTaskkAction>({
    type: ActionTypes.ADD_TASK,
    payload: response.data,
  });
  return response;
};

export const deleteTask = (id: string) => async (dispatch: Dispatch) => {
  const response = await apiRequester().delete(`/tasks/${id}`);

  dispatch<DeleteTaskAction>({
    type: ActionTypes.DELETE_TASK,
  });
  return response;
};

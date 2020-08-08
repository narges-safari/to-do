import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import { actionType, statusType } from "../components/TodoItem";
import ListWithSearchbar from "../components/ListWithSearchbar";

import {
  fetchTasks,
  deleteTask,
  Todo,
} from "../core/store/actions/todoActions";
import { storeState } from "../core/store/reducers/rootReducer";

interface TodoListProps {
  todos: Todo[];
  fetchTasks(): any;
}

const actionsList: Array<actionType> = [
  { label: "Move to TODO", id: 1 },
  { label: "Move to DOING", id: 2 },
  { label: "Move to DONE", id: 3 },
  { label: "Move to TEST", id: 4 },
];
const listsStatus: Array<statusType> = [
  { label: "todo", type: 1 },
  { label: "doing", type: 2 },
  { label: "done", type: 3 },
  { label: "test", type: 4 },
];

const backgrounds: Array<string> = [
  "bisque",
  "green-blue",
  "yellow",
  "lightpink",
];

const ToDo: React.FC<string | object | TodoListProps> = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: storeState) => state.todos);
  const [data, setData] = useState<Todo[]>(todos);

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTasks());
    }
    setData(todos);
  }, [todos, dispatch]);

  const updateData = (itemID: string, moveToSomethingID: number) => {
    console.log(data, itemID);
    setData(
      data.map((item) => {
        if (item._id === itemID)
          return {
            ...item,
            type: moveToSomethingID,
          };
        return item;
      })
    );
  };

  const deleteItemHandler = (id: string) => {
    let confirm = window.confirm("Are you sure you want to delete this item?");
    if (confirm) dispatch(deleteTask(id));
  };

  return (
    <div className="m-3">
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {listsStatus.map((_status, statusIndex) => (
            <ListWithSearchbar
              key={_status.type}
              items={Object.values(data).filter(
                ({ type }) => type === _status.type
              )}
              onAction={updateData}
              actionsList={actionsList.filter(
                (action, index) => index !== statusIndex
              )}
              itemBackground={backgrounds[statusIndex]}
              cardTitle={_status.label}
              onDelete={deleteItemHandler}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ToDo;

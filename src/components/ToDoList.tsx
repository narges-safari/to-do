import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import initialData from "../data.json";
import { ToDoItemType, actionType } from "./TodoItem";
import ListWithSearchbar from "./ListWithSearchbar";

const actionsList: Array<actionType> = [
  { label: "Move to TODO", id: 0 },
  { label: "Move to DOING", id: 1 },
  { label: "Move to DONE", id: 2 },
];

const listsStatus: Array<string> = ["todo", "doing", "done"];

const backgrounds: Array<string> = ["bisque", "green-blue", "yellow"];

const ToDo: React.FC<string | object> = () => {
  const [data, setData] = useState<Array<ToDoItemType>>(initialData);

  const updateData: (itemId: number, actionId: number) => void = (
    itemId,
    actionId
  ) => {
    setData((currentData) =>
      currentData.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: listsStatus[actionId],
            }
          : item
      )
    );
  };

  return (
    <div>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {listsStatus.map((_status, statusIndex) => (
            <ListWithSearchbar
              items={data.filter(({ status }) => status === _status)}
              onAction={updateData}
              actionsList={actionsList.filter(
                (action, index) => index !== statusIndex
              )}
              itemBackground={backgrounds[statusIndex]}
              cardTitle={_status}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ToDo;

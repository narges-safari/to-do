import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  Icon,
} from "@material-ui/core";

import data from "../data.json";

interface ToDoItem {
  id: number;
  title: string;
  status: string;
}

const ToDo: React.FC<string | object> = () => {
  const [todoResults, setTodoResults] = useState<Array<ToDoItem>>(
    data.filter((item) => item.status === "todo")
  );

  const [doingResults, setDoingResults] = useState<Array<ToDoItem>>(
    data.filter((item) => item.status === "doing")
  );

  const [doneResults, setDoneResults] = useState<Array<ToDoItem>>(
    data.filter((item) => item.status === "done")
  );

  const [toDoSearch, setToDoSearch] = useState<string>("");
  const [doingSearch, setDoingSearch] = useState<string>("");
  const [doneSearch, setDoneSearch] = useState<string>("");

  const filterResults = (
    results: Array<ToDoItem>,
    filterString: string,
    type: string
  ): Array<ToDoItem> => {
    if (filterString.trim().length === 0)
      return results.filter((item) => item.status === type);

    return results.filter(
      (item) =>
        item.status === type && item.title.toLowerCase().includes(filterString)
    );
  };

  const onFilterChange = (type: string, value: string) => {
    let filteredResults = [];
    switch (type) {
      case "todo":
        filteredResults = filterResults(data, value.toLowerCase(), type);
        setTodoResults(filteredResults);
        setToDoSearch(value);
        break;
      case "doing":
        filteredResults = filterResults(data, value.toLowerCase(), type);
        setDoingResults(filteredResults);
        setDoingSearch(value);
        break;
      case "done":
        filteredResults = filterResults(data, value.toLowerCase(), type);
        setDoneResults(filteredResults);
        setDoneSearch(value);
    }
  };

  return (
    <div>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          <Card className="m-20">
            <CardHeader
              className="bg black"
              title={<span className="color white">To Do</span>}
            />
            <CardContent className="d-flex flex-d-column">
              <Input
                value={toDoSearch}
                onChange={(e) => onFilterChange("todo", e.target.value)}
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
              />

              {todoResults.map((item, index) => {
                return (
                  <ul key={index} className="p-0 bg bisque">
                    <label>{item.title}</label>
                  </ul>
                );
              })}
            </CardContent>
          </Card>
          <Card className="m-20">
            <CardHeader
              className="bg black"
              title={<span className="color white">Doing</span>}
            />
            <CardContent className="d-flex flex-d-column">
              <Input
                value={doingSearch}
                onChange={(e) => onFilterChange("doing", e.target.value)}
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
              />
              {doingResults.map((item, index) => {
                return (
                  <ul key={index} className="p-0 bg green-blue">
                    <label>{item.title}</label>
                  </ul>
                );
              })}
            </CardContent>
          </Card>
          <Card className="m-20">
            <CardHeader
              className="bg black"
              title={<span className="color white">Done</span>}
            />
            <CardContent className="d-flex flex-d-column">
              <Input
                value={doneSearch}
                onChange={(e) => onFilterChange("done", e.target.value)}
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
              />
              {doneResults.map((item, index) => {
                return (
                  <ul key={index} className="p-0 bg yellow">
                    <label>{item.title}</label>
                  </ul>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ToDo;

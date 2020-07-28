import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  Icon,
} from "@material-ui/core";

import ToDoItem, { ToDoItemType, actionType } from "./TodoItem";

type listWithSearchbarProps = {
  items: Array<ToDoItemType>;
  itemBackground: string;
  actionsList: Array<actionType>;
  onAction: (itemId: number, actionId: number) => void;
  cardTitle: string;
};

const ListWithSearchbar: React.FC<listWithSearchbarProps> = ({
  items,
  itemBackground,
  actionsList,
  onAction,
  cardTitle,
}) => {
  const [data, setData] = useState(items);

  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    setData(
      !searchQuery.trim()
        ? items
        : items.filter(({ title }) =>
            title.toLowerCase().includes(searchQuery.toLowerCase())
          )
    );
  }, [searchQuery, items]);

  //   React.useEffect(() => {
  //     setSearchQuery("");

  //     setData(items);
  //   }, [items]);

  return (
    <Card className="m-20">
      <CardHeader
        className="bg black"
        title={<span className="color white">{cardTitle}</span>}
      />
      <CardContent className="d-flex flex-d-column">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id={`input-with-icon-adornment-${cardTitle}`}
          endAdornment={
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          }
        />

        {data.map((item, index) => {
          return (
            <ToDoItem
              item={item}
              key={item.id}
              actionList={actionsList}
              onAction={(actionId) => onAction(item.id, actionId)}
              backgroundColor={itemBackground}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ListWithSearchbar;

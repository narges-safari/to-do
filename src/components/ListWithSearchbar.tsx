import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import ToDoItem, { actionType } from "./TodoItem";
import { Todo } from "../core/store/actions/todoActions";
import AddTaskModal from "../components/AddTaskModal";
import Popover from "@material-ui/core/Popover";

type listWithSearchbarProps = {
  items: Todo[];
  itemBackground: string;
  actionsList: Array<actionType>;
  onAction: (itemID: string, actionId: number) => void;
  cardTitle: string;
  onDelete: (id: string) => void;
};

const ListWithSearchbar: React.FC<listWithSearchbarProps> = ({
  items,
  itemBackground,
  actionsList,
  onAction,
  cardTitle,
  onDelete,
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

  const cartTitleToType = (cartTitle: string): number => {
    switch (cartTitle) {
      case "todo":
        return 1;

      case "doing":
        return 2;

      case "done":
        return 3;

      case "test":
        return 4;

      default:
        return -1;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const ModalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="p-1">
      <Card className="m-20">
        <CardHeader
          className="bg black "
          title={
            <div className="d-flex align-items-center justify-content-space-between">
              <span className="color white">
                {cardTitle.toLocaleUpperCase()}
              </span>
              <IconButton onClick={ModalHandler}>
                <AddIcon color="secondary" fontSize="inherit" />
              </IconButton>
            </div>
          }
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
          <ul className="p-0">
            {data &&
              data.map((item, index) => {
                return (
                  <ToDoItem
                    item={item}
                    key={item._id}
                    actionList={actionsList}
                    onAction={(actionId) => onAction(item._id, actionId)}
                    onDelete={() => onDelete(item._id)}
                    backgroundColor={itemBackground}
                  />
                );
              })}
          </ul>
        </CardContent>
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AddTaskModal
          onClose={handleClose}
          type={cartTitleToType(cardTitle.toLowerCase())}
        />
      </Popover>
    </div>
  );
};

export default ListWithSearchbar;

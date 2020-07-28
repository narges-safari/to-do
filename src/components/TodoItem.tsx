import React from "react";
import { Popover, Divider } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

export interface ToDoItemType {
  id: number;
  title: string;
  status: string;
}

export type actionType = { id: number; label: string };

type todoItemProps = {
  item: ToDoItemType;
  backgroundColor: string;
  actionList: Array<actionType>;
  onAction: (actionId: number) => void;
};

const ToDoItem: React.FC<todoItemProps> = ({
  item,
  backgroundColor,
  actionList,
  onAction,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const handleMoreAction = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${item.id}` : undefined;

  return (
    <li
      className={`p-0 bg d-flex justify-content-space-between align-items-baseline m-10-0 ${backgroundColor}`}
    >
      <label>{item.title}</label>
      <MoreVert
        onClick={(e) => handleMoreAction(e)}
        className="cursor-pointer"
      />
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
        <ul className="list-style-none" style={{ padding: "0px 15px" }}>
          {actionList.map((action, index, array) => (
            <>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={(e) => onAction(action.id)}
                >
                  {action.label}
                </span>
              </li>

              {index < array.length - 1 && <Divider className="my-2" />}
            </>
          ))}
        </ul>
      </Popover>
    </li>
  );
};

export default ToDoItem;

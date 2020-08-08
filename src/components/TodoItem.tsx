import React from "react";
import { Popover, Divider } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
export interface ToDoItemType {
  _id: string;
  title: string;
  desc: string;
  type: number;
}

export type actionType = { id: number; label: string };

export type statusType = { type: number; label: string };

type todoItemProps = {
  item: ToDoItemType;
  backgroundColor: string;
  actionList: Array<actionType>;
  onAction: (actionId: number) => void;
  onDelete: (id: string) => void;
};

const ToDoItem: React.FC<todoItemProps> = ({
  item,
  backgroundColor,
  actionList,
  onAction,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const handleMoreAction = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${item._id}` : undefined;

  return (
    <li
      key={item._id}
      className={`curved p-1 bg d-flex justify-content-space-between align-items-center m-10-0 ${backgroundColor}`}
    >
      <div className="m-0" style={{ width: 200, whiteSpace: "nowrap" }}>
        <Box
          component="div"
          className="m-0"
          my={2}
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {item.title}
        </Box>
      </div>
      <label></label>
      <div>
        <DeleteOutlineIcon
          className="cursor-pointer"
          onClick={(e) => onDelete(item._id)}
        />
        <MoreVert onClick={handleMoreAction} className="cursor-pointer" />
      </div>
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
          {actionList.map((actionItem, index, array) => (
            <>
              <li key={actionItem.id}>
                <span
                  className="cursor-pointer"
                  onClick={(e) => onAction(actionItem.id)}
                >
                  {actionItem.label}
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

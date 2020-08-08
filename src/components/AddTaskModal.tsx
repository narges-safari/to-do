import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTask } from "../core/store/actions/todoActions";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

interface ModalProps {
  onClose: () => void;
  type: number;
}
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const AddTaskModal: React.FC<ModalProps> = ({ type, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const classes = useStyles();
  const onSubmit = () => {
    dispatch(addTask({ title, desc, type }));
    _onClose();
  };
  const _onClose = () => {
    setTitle("");
    setDesc("");
    onClose();
  };
  return (
    <Card className={classes.root}>
      <CardContent className="d-flex flex-d-column">
        <Typography variant="h5" component="h2">
          Add Task
        </Typography>
        <TextField
          id="standard-basic"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </CardContent>
      <CardActions className="float-right">
        <Button size="small" color="secondary" onClick={_onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddTaskModal;

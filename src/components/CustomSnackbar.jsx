import React from "react";
import {
  selectSnackbarMessage,
  selectSnackbarShow,
  selectSnackbarType,
} from "../store/selectors/snackbarSelectors";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../store/slice/snackbarSlice";
import Snackbar from '../components/template/Snackbar'
import Alert from '../components/template/Alert'

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const open = useSelector(selectSnackbarShow);
  const type = useSelector(selectSnackbarType);
  const message = useSelector(selectSnackbarMessage);
  const handleClose = () => {
    dispatch(hideSnackbar());
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

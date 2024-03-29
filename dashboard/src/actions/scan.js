import API from "./api";
import {
  GET_SCANS,
  GET_SCANS_SUCCESS,
  GET_SCANS_ERROR,
  CREATE_SCAN,
  CREATE_SCAN_SUCCESS,
  CREATE_SCAN_ERROR,
  DELETE_SCAN,
  DELETE_SCAN_SUCCESS,
  DELETE_SCAN_ERROR,
} from "../constants/scan";
import {toast} from "react-toastify";

export const getScans = () => async (dispatch) => {
  dispatch({
    type: GET_SCANS,
  });
  try {
    const data = await API.getScans();
    dispatch({
      type: GET_SCANS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SCANS_ERROR,
      payload: err,
    });
  }
};

export const createScan = (scan) => async (dispatch) => {
  dispatch({
    type: CREATE_SCAN,
  });
  try {
    await API.createScan(scan);
    const data = await API.getScans();
    dispatch({
      type: CREATE_SCAN_SUCCESS,
      payload: data,
    });
    toast.success("Scan Launched !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
  } catch (err) {
    dispatch({
      type: CREATE_SCAN_ERROR,
      payload: err,
    });
  }
};

export const deleteScan = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_SCAN
  });
  try {
    API.deleteScan(id)
      .then((res) => {
        API.getScans().then((data) => {
          dispatch({
            type: DELETE_SCAN_SUCCESS,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_SCAN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_SCAN_ERROR,
      payload: err,
    });
  }
};

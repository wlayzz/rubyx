import API from "./api";
import { slugify } from "../utils/misc";
import {
  GET_PLATFORM,
  GET_PLATFORM_SUCCESS,
  GET_PLATFORM_ERROR,
  CREATE_PLATFORM,
  CREATE_PLATFORM_SUCCESS,
  CREATE_PLATFORM_ERROR,
  DELETE_PLATFORM,
  DELETE_PLATFORM_SUCCESS,
  DELETE_PLATFORM_ERROR,
  UPDATE_PLATFORM,
  UPDATE_PLATFORM_SUCCESS,
  UPDATE_PLATFORM_ERROR
} from "../constants/platform";
import { toast } from "react-toastify";

export const getPlatforms = () => async (dispatch) => {
  dispatch({
    type: GET_PLATFORM,
  });
  try {
    API.getPlatforms()
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_PLATFORM_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const createPlatform = (name, email, password, otp, type) => async (dispatch) => {
  dispatch({
    type: CREATE_PLATFORM,
  });
  try {
    var platform = {
      name: name,
      slug: slugify(name),
      email: email,
      password: password,
      otp: otp,
      hunter_username: "",
      type: type,
    };

    API.createPlatform(platform)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: CREATE_PLATFORM_SUCCESS,
            payload: data,
          });

          toast.success("Platform added !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const updatePlatform = (id, name, email, password, otp, type) => async (dispatch) => {
  dispatch({
    type: UPDATE_PLATFORM,
  });
  try {
    var platform = {
      id: id,
      name: name,
      slug: slugify(name),
      email: email,
      password: password,
      otp: otp,
      type: type,
    };

    API.updatePlatform(platform)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: UPDATE_PLATFORM_SUCCESS,
            payload: data,
          });

          toast.success("Platform updated !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const deletePlatform = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_PLATFORM,
  });
  try {
    API.deletePlatform(id)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: DELETE_PLATFORM_SUCCESS,
            payload: data,
          });

          toast.success("Platform deleted !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

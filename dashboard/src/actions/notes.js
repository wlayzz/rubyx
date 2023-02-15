import API from "./api";
import {
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  GET_NOTES_BY_PROGRAM_ID,
  GET_NOTES_BY_PROGRAM_ID_SUCCESS,
  GET_NOTES_BY_PROGRAM_ID_ERROR,
} from "../constants/notes";

export const getNotes = () => async (dispatch) => {
  dispatch({
    type: GET_NOTES,
  });

  try {
    API.getNotes()
      .then((data) => {
        dispatch({
          type: GET_NOTES_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_NOTES_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_NOTES_ERROR,
      payload: err,
    });
  }
};

export const getNotesByProgramId = (id) => async (dispatch) => {
  dispatch({
    type: GET_NOTES_BY_PROGRAM_ID,
  });

  try {
    API.getNotesByProgram(id)
      .then((data) => {
        dispatch({
          type: GET_NOTES_BY_PROGRAM_ID_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_NOTES_BY_PROGRAM_ID_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_NOTES_BY_PROGRAM_ID_ERROR,
      payload: err,
    });
  }
};

export const createNote = (note) => async (dispatch) => {
  dispatch({
    type: CREATE_NOTE,
  });

  try {
    API.createNote(note)
      .then((res) => {
        API.getNotes().then((data) => {
          dispatch({
            type: CREATE_NOTE_SUCCESS,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_NOTE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_NOTE_ERROR,
      payload: err,
    });
  }
};

export const updateNote =
  (id, title, program_id, content, tag) => async (dispatch) => {
    dispatch({
      type: UPDATE_NOTE,
    });

    try {
      var note = {
        id: id,
        title: title,
        program_id: program_id,
        content: content,
        tag: tag,
      };

      API.updateNote(note)
        .then((res) => {
          API.getNotes().then((data) => {
            dispatch({
              type: UPDATE_NOTE_SUCCESS,
              payload: data,
            });
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_NOTE_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_NOTE_ERROR,
        payload: err,
      });
    }
  };

export const deleteNote = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_NOTE,
  });

  try {
    API.deleteNote(id)
      .then((res) => {
        API.getNotes().then((data) => {
          dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_NOTE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_NOTE_ERROR,
      payload: err,
    });
  }
};

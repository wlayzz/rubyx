import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_SUCCESS,
  GET_SUBDOMAIN_ERROR,
  GET_UNIQUE_TECHNOLOGIES,
  GET_UNIQUE_TECHNOLOGIES_SUCCESS,
  GET_UNIQUE_TECHNOLOGIES_ERROR,
} from "../constants/subdomain";

const initialState = {
  loading: true,
  error: "",
  total: 0,
  subdomains: null,
  uniqueTechnologies: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNIQUE_TECHNOLOGIES:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_UNIQUE_TECHNOLOGIES_SUCCESS:
      return {
        ...state,
        loading: false,
        uniqueTechnologies: action.payload,
        error: "",
      };
    case GET_UNIQUE_TECHNOLOGIES_ERROR:
      return {
        ...state,
        loading: false,
        uniqueTechnologies: null,
        error: action.payload,
      };
    case GET_SUBDOMAIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SUBDOMAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        subdomains: action.payload.subdomains,
        total: action.payload.totalSubdomains,
        error: "",
      };
    case GET_SUBDOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        subdomains: null,
        total: 0,
        error: action.payload,
      };
    default:
      return state;
  }
}

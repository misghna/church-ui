import { useEffect, useCallback, useReducer } from "react";

import useAxiosPrivate from "~/hooks/useAxiosPrivate";

const initialState = {
  setting: {
    menu: [],
    authenticated: true,
    avatar: "",
    default_theme_color: "",
    langs: [],
    product_release_no: "",
    user_name: ""
  },
  loading: false,
  error: null
};
const actionTypes = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true, error: null };

    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, setting: action.payload };

    case actionTypes.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useSetting = (url) => {
  const axiosPrivate = useAxiosPrivate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSetting = useCallback(async () => {
    dispatch({ type: actionTypes.FETCH_START });

    try {
      const response = await axiosPrivate.get(url);
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response?.data });
    } catch (error) {
      console.error("Error fetching menu data", error);
      dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
    }
  }, [axiosPrivate, dispatch, url]);
  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  return { state, dispatch };
};

export default useSetting;

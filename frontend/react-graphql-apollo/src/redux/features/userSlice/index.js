import { createSlice } from "@reduxjs/toolkit";

// import { addUserId, delUserId } from "../recibo/reciboSlice";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  errors: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserCredential: (state, action) => {
      state.credentials = action.payload;
    },
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    doneLoading: (state) => {
      state.loading = false;
    },
    signinSucess: (state, action) => {
      state.authenticated = true;
      state.credentials = action.payload;
    },
    signoutSucess: (state) => {
      state.authenticated = false;
      state.credentials = {};
      state.errors = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
    setErrors: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = null;
    },
  },
});

export const {
  setAuthenticated,
  setUserCredential,
  startLoading,
  doneLoading,
  signinSucess,
  signoutSucess,
  setErrors,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;

export const signIn = (history) => async (dispatch) => {
  let res;
  try {
    dispatch(clearErrors());
    dispatch(startLoading());
    // res = await axios.post("auth/signin", userData);
  } catch (err) {
    console.log(err);
    dispatch(doneLoading());
    dispatch(setErrors(err.response.data));
    return;
  }
  dispatch(signinSucess(res.data));
  // dispatch(addUserId(res.data.usuario.id));
  dispatch(doneLoading());
  history.push("/");
};

export const signOut = () => (dispatch) => {
  dispatch(signoutSucess());
  window.location.href = "/login";
};

const setAuthorizationHeader = (token) => {
  const tokenStr = `Bearer ${token}`;
  localStorage.setItem("token", tokenStr); // setting token to local storage
};

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
      state.credentials = action.payload.usuario;
      setAuthorizationHeader(action.payload.token);
    },
    signoutSucess: (state) => {
      state = initialState;
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

const {
  startLoading,
  doneLoading,
  signinSucess,
  signoutSucess,
  setErrors,
  clearErrors,
} = userSlice.actions;
export const { setAuthenticated, setUserCredential } = userSlice.actions;

export default userSlice.reducer;

export const signIn = (userData, history) => async (dispatch) => {
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
  // dispatch(delUserId());
  window.location.href = "/";
};

const setAuthorizationHeader = (token) => {
  const tokenStr = `Bearer ${token}`;
  localStorage.setItem("token", tokenStr); // setting token to local storage
  // axios.defaults.headers.common["Authorization"] = tokenStr; //setting authorize token to header in axios
};

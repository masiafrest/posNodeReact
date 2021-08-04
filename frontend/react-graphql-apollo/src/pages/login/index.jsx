import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { signinSucess } from "../../redux/features/userSlice";

export default function Login(props) {
  const isAuth = useSelector((state) => state.user.authenticated);
  const history = useHistory();
  isAuth && history.push("/item");
  const dispatch = useDispatch();
  const [login, { loading, error }] = useMutation(
    gql`
      mutation Login($nombre: String!, $password: String!) {
        login(nombre: $nombre, password: $password) {
          token
          usuario {
            nombre
            rol
            id
          }
        }
      }
    `,
    {
      errorPolicy: "all",
      onCompleted: ({ login }) => {
        if (login) {
          localStorage.setItem("token", login.token);
          dispatch(signinSucess(login.usuario));
          props.history.push("/item");
        }
      },
    }
  );
  const initialValue = { nombre: "", password: "" };
  const [userData, setUserData] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: userData });
    // dispatch(signIn(userData, props.history));
  };

  const handleChange = (e) => {
    setUserData((value) => ({
      ...value,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  if (loading) return "loading";

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">SignIn</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="nombre"
          name="nombre"
          type="nombre"
          label="Nombre"
          value={userData.nombre}
          onChange={handleChange}
          fullWidth
          error={error ? true : false}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          error={error ? true : false}
        />
        {error && <Typography variant="body2">{error.message}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          SignIn
          {loading && <CircularProgress size={30} />}
        </Button>
        <br></br>
      </form>
    </Container>
  );
}

import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../redux/features/userSlice";

export default function Login(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [login, { data, error, loading }] = useMutation(
    gql`
      mutation Login($nombre: String, $password: String) {
        login(nombre: $nombre, password: $password) {
          token
          usuario {
            nombre
            rol
            id
          }
        }
      }
    `
  );

  const initialValue = { nombre: "", password: "" };
  const [userData, setUserData] = useState(initialValue);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: userData });
    dispatch(signIn(userData, props.history));
  };

  const handleChange = (e) => {
    setUserData((value) => ({
      ...value,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

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
        {error && <Typography variant="body2">{error}</Typography>}
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

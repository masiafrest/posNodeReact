import { useState, useEffect } from "react";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../redux/features/userSlice";
export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialValue = { nombre: "", password: "" };
  const [userData, setUserData] = useState(initialValue);
  const [errors, setErrors] = useState({
    nombre: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.errors) {
      setErrors(user.errors);
    }
    setLoading(user.loading);
  }, [user.errors, user.loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          helperText={errors.nombre}
          error={errors.nombre ? true : false}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          helperText={errors.password}
          error={errors.password ? true : false}
        />
        {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )}
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

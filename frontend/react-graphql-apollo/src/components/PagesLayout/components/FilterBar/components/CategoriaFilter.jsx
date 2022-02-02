import { GET_CATEGORIAS } from "../../../../../pages/categoria/graphql/query";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export default function CategoriaFilter({ categoriaState }) {
  const [categoria, dispatch, isVenta] = categoriaState;
  const { data, loading, error } = useQuery(GET_CATEGORIAS, {
    variables: { filter: "", skip: 0 },
  });
  if (loading) return "Loading...";
  if (error) return `error: ${error}`;

  const categoriasList = data.categorias.query.map(({ id, nombre }) => (
    <MenuItem value={nombre} key={nombre + id}>
      {nombre}
    </MenuItem>
  ));

  const handleChange = (e) => {
    if (isVenta) {
      console.log("isVenta value:", e.target.value);
      dispatch(e.target.value);
      return;
    }
    dispatch({ type: "categoria", payload: e.target.value });
  };

  return (
    <FormControl>
      <InputLabel id="inputLabel-categoria">Categorias</InputLabel>
      <Select
        labelId="select-categoria"
        id="select-categoria"
        value={categoria}
        onChange={handleChange}
      >
        <MenuItem value={"TODOS"}>TODOS</MenuItem>
        {categoriasList}
      </Select>
    </FormControl>
  );
}

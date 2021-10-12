import { GET_ALL_CATEGORIAS } from "../../../../pages/categoria/graphql/query";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export default function CategoriaFilter({ categoriaState }) {
  const [categoria, setCategoria] = categoriaState;
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIAS);
  if (loading) return "Loading...";
  if (error) return `error: ${error}`;
  console.log("cagetoria filter error:", error);
  console.log("cagetoria filter data:", data);
  console.log("cagetoria filter categoria:", categoria);

  const categoriasList = data.getAllCategorias.map(({ id, nombre }) => (
    <MenuItem value={nombre}>{nombre}</MenuItem>
  ));

  const handleChange = (e) => {
    setCategoria(e.target.value);
    console.log("select categoria change:", e.target);
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
        <MenuItem value={"todos"}>todos</MenuItem>
        {categoriasList}
      </Select>
    </FormControl>
  );
}

import { GET_CATEGORIAS } from "../../../../../pages/categoria/graphql/query";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export default function CategoriaFilter({ categoriaState }) {
  const [categoria, setCategoria] = categoriaState;
  const { data, loading, error } = useQuery(GET_CATEGORIAS, {
    variables: { filter: "", skip: 0 },
  });
  if (loading) return "Loading...";
  if (error) return `error: ${error}`;

  const categoriasList = data.categorias.query.map(({ id, nombre }) => (
    <MenuItem value={nombre} key={nombre}>
      {nombre}
    </MenuItem>
  ));

  const handleChange = (e) => {
    setCategoria(e.target.value);
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

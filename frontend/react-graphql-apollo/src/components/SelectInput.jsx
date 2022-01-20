import { useQuery } from "@apollo/client";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function SelectInput({
  type = "categorias",
  GET_QUERY,
  defaultValue = [],
  setNewItem,
  multiple = false,
}) {
  const { data, loading } = useQuery(GET_QUERY, {
    variables: { filter: "", skip: 0 },
  });

  // console.log("default value:", type, defaultValue);
  const handleChange = (_, newValue) => {
    // console.log("selectinput handle change newValue:", newValue);
    const key = multiple ? type : type.slice(0, -1);
    const value = multiple
      ? newValue.map((e) => e?.toUpperCase())
      : newValue
      ? newValue.toUpperCase()
      : undefined;
    // console.log("handle change value", value);
    setNewItem((item) => ({
      ...item,
      [key]: value,
    }));
  };

  if (loading) return "loading";

  return (
    <div>
      <Autocomplete
        multiple={multiple}
        name={type}
        id={`${type}-autocomplete`}
        options={data[type]?.query.map((e) => e.nombre)}
        getOptionLabel={(option) => {
          return option;
        }}
        defaultValue={multiple ? defaultValue : defaultValue}
        freeSolo
        onChange={handleChange}
        renderInput={(params) => {
          return <TextField {...params} variant="standard" label={type} />;
        }}
      />
    </div>
  );
}

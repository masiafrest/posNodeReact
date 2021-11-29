import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../../categoria/graphql/query";

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

export default function MultipleSelect({
  array = [],
  setNewItem,
  type = "categorias",
}) {
  const { data, loading } = useQuery(GET_CATEGORIAS, {
    variables: { filter: "", skip: 0 },
  });

  const handleChange = (_, newValue) => {
    setNewItem((item) => ({
      ...item,
      [type]: newValue.map((e) => e.toUpperCase()),
    }));
  };

  if (loading) return "loading";

  return (
    <div>
      <Autocomplete
        multiple
        name="categorias"
        id="tags-standard"
        options={data?.categorias.query.map((e) => e.nombre)}
        getOptionLabel={(option) => option}
        defaultValue={array}
        freeSolo
        onChange={handleChange}
        renderInput={(params) => {
          return <TextField {...params} variant="standard" label={type} />;
        }}
      />
    </div>
  );
}

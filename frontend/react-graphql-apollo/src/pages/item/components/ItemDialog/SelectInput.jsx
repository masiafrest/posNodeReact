import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../../categoria/graphql/query";
import { GET_MODELOS } from "../../graphql/query";
import { GET_CARACTERISTICAS } from "../../graphql/query";
import { GET_MARCAS } from "../../graphql/query";
import { GET_COLORS } from "../../graphql/query";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

let GET_QUERY;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function SelectInput({
  defaultValue = [],
  setNewItem,
  type = "categorias",
  multiple = false,
}) {
  if (type === "categorias") {
    GET_QUERY = GET_CATEGORIAS;
  }
  if (type === "modelos") {
    GET_QUERY = GET_MODELOS;
  }
  if (type === "caracteristicas") {
    GET_QUERY = GET_CARACTERISTICAS;
  }
  if (type === "colors") {
    GET_QUERY = GET_COLORS;
  }
  if (type === "marcas") {
    GET_QUERY = GET_MARCAS;
  }
  const { data, loading } = useQuery(GET_QUERY, {
    variables: { filter: "", skip: 0 },
  });
  console.log("useQuery:", type, data);
  const handleChange = (_, newValue) => {
    console.log("selectinput handle change newValue:", newValue);
    const key = multiple ? type : type.slice(0, -1);
    const value = multiple
      ? newValue.map((e) => e?.toUpperCase())
      : newValue
      ? newValue.toUpperCase()
      : undefined;
    setNewItem((item) => ({
      ...item,
      key: value,
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
          console.log("getoptionlabel:", type, option);
          return option;
        }}
        defaultValue={defaultValue}
        freeSolo
        onChange={handleChange}
        onInputChange={(_, value)=>{
            value.toUpperCase()
        }}
        renderInput={(params) => {
          return <TextField {...params} variant="standard" label={type} />;
        }}
      />
    </div>
  );
}

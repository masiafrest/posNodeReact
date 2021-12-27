import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIAS } from "../../../categoria/graphql/query";
import {GET_MODELOS} from '../../graphql/query'

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

let GET_QUERY

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
    multiple = false
}) {
    if (type === 'categorias'){
        GET_QUERY = GET_CATEGORIAS
    }
    if (type === 'modelos'){
        GET_QUERY = GET_MODELOS
    }
    const { data, loading } = useQuery(GET_QUERY, {
        variables: { filter: "", skip: 0 },
    });
    console.log('useQuery:', type, data);
    const handleChange = (_, newValue) => {
        console.log('selectinput handle change newValue:', newValue)
        setNewItem((item) => ({
            ...item,
            [type]: multiple ? newValue.map((e) => e.toUpperCase()) : newValue.toUpperCase(),
        }));
    };

    if (loading) return "loading";

    return (
        <div>
        <Autocomplete
        multiple = {multiple}
        name={type}
        id={`${type}-autocomplete`}
        options={data[type]?.query.map((e) => e.nombre)}
        getOptionLabel={(option) => {
            console.log('getoptionlabel:', type, option)
            return option}}
        defaultValue={defaultValue}
        freeSolo
        onChange={handleChange}
        renderInput={(params) => {
            return <TextField {...params} variant="standard" label={type} />;
        }}
        />
        </div>
    );
}

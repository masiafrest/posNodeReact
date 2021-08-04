import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, catName, theme) {
  return {
    fontWeight:
      catName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectCategoria({ categorias = [], setNewItem }) {
  const classes = useStyles();
  const theme = useTheme();
  const [selCatName, setSelCatName] = useState(categorias);

  const GET_CATEGORIAS = gql`
    {
      categorias(filter: "") {
        id
        nombre
      }
    }
  `;
  const { data, loading } = useQuery(GET_CATEGORIAS);
  useEffect(() => {
    if (!loading) {
      let catArr = [];
      selCatName.forEach((e) => {
        const id = data.categorias.find((obj) => obj.nombre === e).id * 1;
        catArr.push({ id });
      });
      setNewItem((item) => ({ ...item, categorias: catArr }));
    }
  }, [selCatName, data]);

  const handleChange = (event) => {
    setSelCatName(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="multiple-categorias-select">Categorias</InputLabel>
        <Select
          labelId="multiple-categorias-select"
          id="multiple-categorias-select"
          multiple
          name="categorias"
          value={selCatName}
          onChange={handleChange}
          input={<Input id="select-multiple-categorias-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {loading ? (
            <MenuItem>loading</MenuItem>
          ) : (
            data?.categorias?.map((obj, idx) => (
              <MenuItem
                key={obj.nombre}
                value={obj.nombre}
                style={getStyles(obj.nombre, selCatName, theme)}
              >
                {obj.nombre}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </>
  );
}

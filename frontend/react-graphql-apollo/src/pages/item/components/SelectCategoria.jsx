import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, catName, theme) {
  return {
    fontWeight:
      catName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function SelectCategoria({categorias, setNewItem}) {
  const classes = useStyles();
  const theme = useTheme();
  let catName
  const [selCatName, setSelCatName] = useState(categorias)
  console.log(categorias)

  const GET_CATEGORIAS = gql`{
    categorias{
      id nombre
    }
  }
  `
  const {data, loading, error} = useQuery(GET_CATEGORIAS)
  useEffect(()=>{
  catName = data.categorias.map(e => e.nombre)
  },[data])

  useEffect(() => {
    let catArr = [];
    selCatName.forEach((e) => {
      const id = data.categorias.find((obj) => obj.nombre === e).id*1;
      catArr.push({ id });
    });
    setNewItem({categorias:catArr });
  }, [selCatName]);

  const handleChange = (event) => {
    setSelCatName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          name="categorias"
          value={selCatName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {data.categorias.map((obj, idx) => (
            <MenuItem
              key={obj.nombre}
              value={obj.nombre}
              style={getStyles(obj.nombre, selCatName, theme)}
            >
              {obj.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

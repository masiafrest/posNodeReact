import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchField() {
  const submitHandler = () => {};
  const handleChange = () => {};
  const values = false;
  return (
    <FormControl>
      <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
      <Input
        id="input-with-icon-adornment"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={submitHandler}
              disabled={values ? false : true}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

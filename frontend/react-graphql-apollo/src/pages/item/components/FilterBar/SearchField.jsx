import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchField({ onSubmitSearch }) {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit", e);
  };
  const handleChange = (e) => {
    console.log("change", e);
  };
  const values = false;
  return (
    <form onSubmit={onSubmitSearch}>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled={values ? false : true}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

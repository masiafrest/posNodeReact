import { NativeSelect, Typography } from "@material-ui/core";

export default function SelectItemPerPage({ title, take, setTake, setPage }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>{title} por pagina</Typography>
      <NativeSelect
        value={take}
        onChange={(e) => {
          setTake(e.target.value * 1);
          setPage(1);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </NativeSelect>
    </div>
  )

}
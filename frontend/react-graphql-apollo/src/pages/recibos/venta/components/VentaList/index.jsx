import { useContext } from "react";

import { useQuery } from "@apollo/client";
import { GET_VENTAS } from "../../grapql/query";
import VentaAccordion from "./VentaAccordion";

import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export default function ItemList({ context }) {
  const {
    pageState: [page, setPage],
    filterState: [filter, setFilter],
    takeState: [take, setTake],
    // viewState: [view, setView],
  } = useContext(context);
  const skip = page === 1 ? 0 : (page - 1) * take;
  const { data, loading, error } = useQuery(GET_VENTAS, {
    variables: { filter, take, skip },
  });

  if (loading) return <div>loading</div>;
  if (error) return `${error}`;
  console.log("venta data", data);
  const pages = Math.ceil(data.ventas.count / take);
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      <Pagination
        count={pages}
        page={page}
        onChange={(e, p) => {
          setPage(p);
        }}
      />
      <Grid container spacing={1}>
        {data.ventas.query.map((venta) => (
          <Grid item key={`item-grid-${venta.id}`}>
            <VentaAccordion venta={venta} key={`venta-${venta.id}`} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

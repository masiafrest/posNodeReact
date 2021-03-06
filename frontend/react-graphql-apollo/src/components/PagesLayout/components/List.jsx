import { Grid } from "@material-ui/core";

export default function List({ view, data, viewComp }) {
  const { Card, Accordion } = viewComp;
  //TODO add grid, a swipable to del, maybe a materialUiContainer too
  return (
    <>
      {data?.map((item, idx) => (
        <Grid item key={`item-grid-${item.id}-${idx}`} xs={12} sm={6} md={4}>
          {Accordion ? (
            view ? (
              <Card data={item} key={`item-${item.id}`} />
            ) : (
              <Accordion data={item} key={`item-${item.id}`} />
            )
          ) : (
            <Card data={item} key={`item-${item.id}`} />
          )}
        </Grid>
      ))}
    </>
  );
}

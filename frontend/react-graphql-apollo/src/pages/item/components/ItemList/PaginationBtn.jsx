import { Button } from "@material-ui/core";

export default function PaginationBtn({ isNext, history, page }) {
  const previousHandler = () => {
    if (page === 2) {
      history.push(`/item`);
    }
    if (page > 2) {
      history.push(`/item/new/${page - 1}`);
    }
  };

  const nextHandler = () => {
    history.push(`/item/new/${page + 1}`);
  };

  return (
    <Button variant="outlined" onClick={isNext ? nextHandler : previousHandler}>
      {isNext ? "next" : "previous"}
    </Button>
  );
}

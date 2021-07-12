import { Button } from "@material-ui/core";

export default function BtnNextPrevious({ isNext, history, page }) {
  const previousHandler = () => {
    if (page === 2) {
      history.push(`/categoria`);
    }
    if (page > 2) {
      history.push(`/categoria/new/${page - 1}`);
    }
  };

  const nextHandler = () => {
    history.push(`/categoria/new/${page + 1}`);
  };

  return (
    <Button variant="outlined" onClick={isNext ? nextHandler : previousHandler}>
      {isNext ? "next" : "previous"}
    </Button>
  );
}

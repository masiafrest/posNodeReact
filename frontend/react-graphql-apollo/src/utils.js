export function getViewComp(Card, Accordion) {
  return {
    Card,
    Accordion,
  };
}

export function getUrlHost() {
  const cellooIp = "192.168.1.104";
  return process.env.NODE_ENV === "development" ? "localhost" : cellooIp;
}

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

export function getImgUrls(image_url) {
  const host = getUrlHost();
  const url = `http://${host}:4000/upload/item/`;
  const imgNames = image_url.split(", ");
  const imgUrls = imgNames[0] === "" ? [] : imgNames.map((name) => url + name);
  return imgUrls;
}

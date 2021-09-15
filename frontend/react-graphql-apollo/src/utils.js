import jwtDecode from "jwt-decode";
import {
  signOut,
  setAuthenticated,
  setUserCredential,
} from "./redux/features/userSlice";

export function getViewComp(Card, Accordion) {
  return {
    Card,
    Accordion,
  };
}

export function getUrlHost() {
  const cellooIp = "192.168.1.101";
  return process.env.NODE_ENV === "development" ? "localhost" : cellooIp;
}

export function getImgUrls(image_url) {
  const host = getUrlHost();
  const url = `http://${host}:4000/upload/item/`;
  const imgNames = image_url.split(", ");
  const imgUrls = imgNames[0] === "" ? [] : imgNames.map((name) => url + name);
  return imgUrls;
}

export function checkToken(store) {
  const token = localStorage.token;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(signOut);
      window.location.href = "/login"; //en logOutUser esta esta linea borrar una de las 2?
    } else {
      store.dispatch(setAuthenticated());
      store.dispatch(setUserCredential({ ...decodedToken }));
      //setting authorize token to header in axios
      // store.dispatch(getUserData())
    }
  }
}

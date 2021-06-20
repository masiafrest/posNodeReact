import {useState} from "react";
import { useQuery  } from "@apollo/client";
import {  GET_ITEMS } from "./graphql/query";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  const [filter, setFilter] = useState(null)
  const [take, setTake] = useState(5)
  const [skip, setSkip] = useState(0)
  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables:{filter, take, skip}
  });
  console.log("data", data);

  if (loading) return <div>loading</div>
  if (error) return `${error}`

  return (
    <>
      <h1>item pages</h1>
      {
      //filtro y barra de busqueda 
      }
      {
      data ? (
        <ItemList items={data.items} />
      ) : (
        <div> data undefined puede que no este conectado al servidor</div>
      )}
      <CreateItemDialog />
    </>
  );
}

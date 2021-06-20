import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ITEM } from "./graphql/query";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  const [filter, setFilter] = useState('')
  const [take, setTake] = useState(5)
  const [skip, setSkip] = useState(5)
  const { data, loading, error } = useQuery(GET_ITEM, {
    variables:{filter, take, skip}
  });
  console.log("data", data);

  return (
    <>
      <h1>item pages</h1>
      {//filtro y barra de busqueda 
      }
      {loading ? (
        <div>loading</div>
      ) : data ? (
        <ItemList items={data.items} />
      ) : (
        <div> data undefined puede que no este conectado al servidor</div>
      )}
      <CreateItemDialog />
    </>
  );
}

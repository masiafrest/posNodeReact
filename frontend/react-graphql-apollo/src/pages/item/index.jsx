import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ITEM } from "./graphql/query";
import ItemList from "./components/ItemList";
import CreateItemDialog from "./components/ItemDialog/";

export default function Item() {
  const { data, loading, error } = useQuery(GET_ITEM);
  console.log("data", data);
  return (
    <>
      <h1>item pages</h1>
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

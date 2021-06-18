import React from "react";
import { useQuery, gql } from "@apollo/client";
import {GET_ITEM} from './graphql/query'
import ItemList from "./components/ItemList";
import CreateItemDialog from './components/ItemDialog/'

export default function Item() {
  const { data, loading, error } = useQuery(GET_ITEM);
  return (
    <>
      <div>item pages</div>;
      {loading ? <div>loading</div> : <ItemList items={data.items} />}
      <CreateItemDialog />
    </>
  );
}

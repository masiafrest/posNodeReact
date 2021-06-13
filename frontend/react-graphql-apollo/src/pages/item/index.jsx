import React from "react";
import { useQuery, gql } from "@apollo/client";
import ItemList from "./ItemList";

export default function Item() {
  const ITEM_QUERY = gql`{
            items (filter:${null}, 
            take: ${5}, 
            skip: ${0}
            ){
              id
              marca
              modelo
              barcode
              sku
              descripcion
              qty
              categorias {
                id
                nombre
              }
              precio {
                precio
                precioMin
              }
              ubicacion {
                id
                tipo
                dirrecion
              }
            }
          }`;
  const { data, loading, error } = useQuery(ITEM_QUERY);
  return (
    <>
      <div>item pages</div>;
      {loading ? <div>loading</div> : <ItemList items={data.items} />}
    </>
  );
}

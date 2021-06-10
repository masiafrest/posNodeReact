import React from "react";
import { useQuery, gql } from "@apollo/client";
import ItemsList from "./components/ItemsList";

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
  console.log(data);
  return (
    <>
      <div>item pages</div>;
      <ItemsList data={data} />
    </>
  );
}

import React from "react";
import { useQuery, gql } from "@apollo/client";
import ItemList from "./components/ItemList";
import ItemCreateDialogIcon from "./components/ItemCreateDialogIcon";

export const ITEM_DATA = gql`
  fragment itemData on Item {
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
`;

export default function Item() {
  const ITEM_QUERY = gql`{
            items (filter:${null}, 
            take: ${5}, 
            skip: ${0}
            ){
              ...itemData
            }
          }
          ${ITEM_DATA} 
          `;
  const { data, loading, error } = useQuery(ITEM_QUERY);
  return (
    <>
      <div>item pages</div>;
      {loading ? <div>loading</div> : <ItemList items={data.items} />}
      <ItemCreateDialogIcon />
    </>
  );
}

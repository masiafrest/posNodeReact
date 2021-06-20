import { gql } from "@apollo/client";

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

 export const GET_ITEM= gql`{
   query GetItems($filter: String, $take:Int, $skip: Int){
            items (filter:$filter, 
            take: $take, 
            skip: $skip
            ){
              ...itemData
            }
          }
          ${ITEM_DATA} 
   }
          `;
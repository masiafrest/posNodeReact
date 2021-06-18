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
            items (filter:${null}, 
            take: ${5}, 
            skip: ${0}
            ){
              ...itemData
            }
          }
          ${ITEM_DATA} 
          `;
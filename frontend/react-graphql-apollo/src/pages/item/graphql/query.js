import { gql } from "@apollo/client";

export const ITEM_DATA = gql`
  fragment itemData on Item {
    id
    image_url
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

export const GET_ITEMS = gql`
  query Items($filter: String, $take: Int, $skip: Int, $lte: Int, $gte: Int) {
    items(filter: $filter, take: $take, skip: $skip, lte: $lte, gte: $gte) {
      query {
        ...itemData
      }
      count
    }
  }
  ${ITEM_DATA}
`;

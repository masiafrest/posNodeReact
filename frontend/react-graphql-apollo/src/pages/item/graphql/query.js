import { gql } from "@apollo/client";

export const ITEM_DATA = gql`
  fragment itemData on Item {
    id
    image_url
    barcode
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
    color {
      id
      nombre
    }
    marca {
      nombre
      id
    }
    modelos {
      id
      nombre
    }
    caracteristicas {
      id
      nombre
    }
  }
`;

export const GET_ITEMS = gql`
  query Items(
    $filter: String
    $take: Int
    $skip: Int
    $lte: Int
    $categoria: String
  ) {
    items(
      filter: $filter
      take: $take
      skip: $skip
      lte: $lte
      categoria: $categoria
    ) {
      query {
        ...itemData
      }
      count
    }
  }
  ${ITEM_DATA}
`;

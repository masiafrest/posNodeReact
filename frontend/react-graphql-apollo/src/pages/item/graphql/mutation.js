import { ITEM_DATA } from "../graphql/query";
import { gql } from "@apollo/client";

export const POST_ITEM = gql`
  mutation PostItem(
    $marca: String!
    $modelo: String!
    $barcode: Int
    $sku: String
    $qty: Int
    $descripcion: String
    $precio: Float
    $precioMin: Float
    $ubicacion: IdInput
    $categorias: [IdInput]
    $images: [Upload]
  ) {
    postItem(
      marca: $marca
      modelo: $modelo
      barcode: $barcode
      sku: $sku
      qty: $qty
      descripcion: $descripcion
      precio: $precio
      precioMin: $precioMin
      categorias: $categorias
      ubicacion: $ubicacion
      images: $images
    ) {
      ...itemData
    }
  }
  ${ITEM_DATA}
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: Int!
    $marca: String
    $modelo: String
    $barcode: Int
    $sku: String
    $qty: Int
    $descripcion: String
    $precio: Float
    $precioMin: Float
    $categorias: [IdInput]
    $images: [Upload]
  ) {
    updateItem(
      id: $id
      marca: $marca
      modelo: $modelo
      barcode: $barcode
      sku: $sku
      qty: $qty
      descripcion: $descripcion
      precio: $precio
      precioMin: $precioMin
      categorias: $categorias
      images: $images
    ) {
      ...itemData
    }
  }
  ${ITEM_DATA}
`;

export const DEL_ITEM = gql`
  mutation DelItem($id: Int!) {
    delItem(id: $id) {
      id
      marca
      modelo
      descripcion
    }
  }
`;

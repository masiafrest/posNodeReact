import { ITEM_DATA } from "../graphql/query";
import { gql } from "@apollo/client";

export const POST_ITEM = gql`
  mutation PostItem(
    $barcode: Int
    $qty: Int
    $descripcion: String
    $precio: Float
    $precioMin: Float
    $ubicacion: IdInput
    $categorias: [String]
    $images: [Upload]
    $marca: String
    $modelos: [String]
    $color: String
    $caracteristicas: [String]
  ) {
    postItem(
      barcode: $barcode
      qty: $qty
      descripcion: $descripcion
      precio: $precio
      precioMin: $precioMin
      categorias: $categorias
      ubicacion: $ubicacion
      images: $images
      marca: $marca
      modelos: $modelos
      color: $color
      caracteristicas: $caracteristicas
    ) {
      ...itemData
    }
  }
  ${ITEM_DATA}
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: Int!
    $barcode: Int
    $qty: Int
    $descripcion: String
    $precio: Float
    $precioMin: Float
    $categorias: [String]
    $images: [Upload]
    $marca: String
    $modelos: [String]
    $color: String
    $caracteristicas: [String]
  ) {
    updateItem(
      id: $id
      barcode: $barcode
      qty: $qty
      descripcion: $descripcion
      precio: $precio
      precioMin: $precioMin
      categorias: $categorias
      images: $images
      marca: $marca
      modelos: $modelos
      color: $color
      caracteristicas: $caracteristicas
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
      descripcion
    }
  }
`;

import {ITEM_DATA} from '../graphql/query'
import { gql } from "@apollo/client";

  export const POST_ITEM = gql`
    mutation PostItem(
      $marca: String
      $modelo: String
      $barcode: Int
      $sku: String
      $qty: Int
      $descripcion: String
      $precio: Float
      $precioMin: Float
      $categorias: [IdInput]
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
      ) {
        ...itemData
      }
    }
    ${ITEM_DATA}
  `;
 export const GET_CATEGORIAS = gql`
    {
      categorias {
        id
        nombre
      }
    }
  `;

export const UPDATE_ITEM = gql`
    mutation UpdateItem($id: Int!, $marca: String,
      $modelo: String, $barcode: Int, $sku: String, $qty: Int,
      $descripcion: String,  $precio: Float,
      $precioMin: Float, $categorias: [IdInput]
     ){
      updateItem(id: $id, 
        marca: $marca, modelo: $modelo,
        barcode: $barcode, sku: $sku, qty: $qty, descripcion: $descripcion,
        precio: $precio, precioMin: $precioMin,
        categorias: $categorias
      ){
        ...itemData
      }
    }
        ${ITEM_DATA}
  `
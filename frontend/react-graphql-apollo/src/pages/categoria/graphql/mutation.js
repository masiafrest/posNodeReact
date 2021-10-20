import { gql } from "@apollo/client";
import { CATEGORIAS_DATA } from "./query";

export const POST_CATEGORIA = gql`
  mutation PostCategoria($nombre: String!) {
    postCategoria(nombre: $nombre) {
      ...categoriaData
    }
  }
  ${CATEGORIAS_DATA}
`;

export const UPDATE_CATEGORIA = gql`
  mutation UpdateCategoria($id: Int!, $nombre: String) {
    updateCategoria(id: $id, nombre: $nombre) {
      ...categoriaData
    }
  }
  ${CATEGORIAS_DATA}
`;

export const DEL_CATEGORIA = gql`
  mutation DelCategoria($id: Int) {
    delCategoria(id: $id) {
      ...categoriaData
    }
  }
  ${CATEGORIAS_DATA}
`;

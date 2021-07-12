import { gql } from "@apollo/client";

export const POST_CATEGORIA = gql`
  mutation PostCategoria($nombre: String!) {
    postCategoria(nombre: $nombre) {
      id
      nombre
    }
  }
`;

export const UPDATE_CATEGORIA = gql`
  mutation UpdateCategoria($id: Int!, $nombre: String) {
    updateCategoria(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

export const DEL_CATEGORIA = gql`
  mutation DelCategoria($id: Int) {
    delCategoria(id: $id) {
      id
      nombre
    }
  }
`;

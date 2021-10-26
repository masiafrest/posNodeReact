import { gql } from "@apollo/client";

export const POST_USUARIO = gql`
  mutation PostUsuario($nombre: String, $password: String, $rol: Rol) {
    postUsuario(nombre: $nombre, password: $password, rol: $rol) {
      id
      nombre
      rol
    }
  }
`;
export const UPDATE_USUARIO = gql`
  mutation UpdateUsuario(
    $id: ID
    $nombre: String
    $rol: Rol
    $password: String
  ) {
    updateUsuario(id: $id, nombre: $nombre, rol: $rol, password: $password) {
      id
      nombre
      rol
    }
  }
`;

export const DEL_USUARIO = gql`
  mutation DelUsuario($id: ID) {
    delUsuario(id: $id) {
      id
      nombre
      rol
    }
  }
`;

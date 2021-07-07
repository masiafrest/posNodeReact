import { gql } from "@apollo/client";

export const POST_CLIENTE = gql`
  mutation PostCliente(
    $nombre: String!
    $telefono: String!
    $dirrecion: String
  ) {
    postCliente(nombre: $nombre, telefono: $telefono, dirrecion: $dirrecion) {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;

export const UPDATE_CLIENTE = gql`
  mutation UpdateCliente(
    $id: Int!
    $nombre: String
    $telefono: String
    $dirrecion: String
  ) {
    updateItem(
      id: $id
      nombre: $nombre
      telefono: $telefono
      dirrecion: $dirrecion
    ) {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;

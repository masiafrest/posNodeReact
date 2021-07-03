import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query clientes {
    id
    nombre
    telefono
    dirrecion
  }
`;

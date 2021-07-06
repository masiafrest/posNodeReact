import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClientes {
    clientes {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;

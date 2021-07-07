import { gql } from "@apollo/client";

export const GET_CLIENTES = gql`
  query getClientes {
    clientes {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;
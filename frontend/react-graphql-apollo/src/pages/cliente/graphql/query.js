import { gql } from "@apollo/client";

export const GET_CLIENTES = gql`
  query Clientes($filter: String, $take: Int, $skip: Int) {
    clientes(filter: $filter, take: $take, skip: $skip) {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;

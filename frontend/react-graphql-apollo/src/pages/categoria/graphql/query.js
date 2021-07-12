import { gql } from "@apollo/client";

export const GET_CATEGORIAS = gql`
  query Categorias($filter: String, $take: Int, $skip: Int) {
    categorias(filter: $filter, take: $take, skip: $skip) {
      id
      nombre
    }
  }
`;

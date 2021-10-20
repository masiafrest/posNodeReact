import { gql } from "@apollo/client";

export const CATEGORIAS_DATA = gql`
  fragment categoriaData on Categoria {
    id
    nombre
  }
`;

export const GET_CATEGORIAS = gql`
  query Categorias($filter: String, $take: Int, $skip: Int) {
    categorias(filter: $filter, take: $take, skip: $skip) {
      query {
        ...categoriaData
      }
      count
    }
  }
  ${CATEGORIAS_DATA}
`;

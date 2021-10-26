import { gql } from "@apollo/client";

export const USUARIO_DATA = gql`
  fragment usuarioData on Usuario {
    id
    nombre
    rol
  }
`;

export const GET_USUARIO = gql`
  query Usuario($filter: String, $skip: Int, $take: Int) {
    usuarios(filter: $filter, skip: $skip, take: $take) {
      query {
        ...usuarioData
      }
      count
    }
  }
  ${USUARIO_DATA}
`;

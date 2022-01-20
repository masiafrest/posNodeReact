import { gql } from "@apollo/client";

export const CONTEO_INV_DATA = gql`
  fragment conteoInvs on ConteoInvs {
    id
    marca {
      nombre
      id
    }
    categoria {
      nombre
      id
    }
    itemSkiped
    usuario {
      nombre
      id
    }
    createAt
    completed
    deleted
  }
`;

export const GET_CONTEO_INV = gql`
  query ConteoInvs($filter: String, $take: Int, $skip: Int) {
    conteoInvs(filter: $filter, take: $take, skip: $skip) {
      query {
        ...conteoInvs
      }
      count
    }
  }
  ${CONTEO_INV_DATA}
`;

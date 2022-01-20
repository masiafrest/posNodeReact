import { gql } from "@apollo/client";

export const INV_STARTED_DATA = gql`
  fragment invStarteds on InvStarteds {
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

export const GET_INV_STARTED = gql`
  query InvStarteds($filter: String, $take: Int, $skip: Int) {
    invStarteds(filter: $filter, take: $take, skip: $skip) {
      query {
        ...invStarteds
      }
      count
    }
  }
  ${INV_STARTED_DATA}
`;

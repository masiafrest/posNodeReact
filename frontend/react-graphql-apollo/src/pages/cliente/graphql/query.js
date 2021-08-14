import { gql } from "@apollo/client";

export const CLIENTE_DATA = gql`
                  fragment clienteData on Cliente {
                    id
                    nombre
                    telefono
                    dirrecion
                  }
                `

export const GET_CLIENTES = gql`
  query Clientes($filter: String, $take: Int, $skip: Int) {
    clientes(filter: $filter, take: $take, skip: $skip) {
      query{
        ...clienteData
      }
      count
    }
  }
  ${CLIENTE_DATA}
`;

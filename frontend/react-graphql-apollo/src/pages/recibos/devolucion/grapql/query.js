import { gql } from "@apollo/client";

export const DEVOLUCION_DATA = gql`
  fragment devolucionData on Devolucion {
    id
    fecha
    usuarioNombre
    clienteNombre
    lineas {
      qty
      descripcion
      razon
      esItemDevolvuelto
    }
  }
`;

export const GET_DEVOLUCIONES = gql`
  query getDevoluciones($filter: String, $take: Int, $skip: Int) {
    devoluciones(filter: $filter, take: $take, skip: $skip) {
      query {
        ...devolucionData
      }
      count
    }
  }
  ${DEVOLUCION_DATA}
`;

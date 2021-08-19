import { gql } from "@apollo/client";

export const DEVOLUCION_DATA = gql`
  fragment devolucionData on Devolucion {
    id
    fecha
    usuario {
      id
      nombre
      rol
    }
    cliente {
      nombre
      telefono
      dirrecion
    }
    lineas {
      qty
      descripcion
      qtyDevuelto
      itemDevuelto
      descripcionDevuelto
      razon
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

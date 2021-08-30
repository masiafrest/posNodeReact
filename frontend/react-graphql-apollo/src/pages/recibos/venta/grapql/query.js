import { gql } from "@apollo/client";

export const VENTA_DATA = gql`
  fragment ventaData on Venta {
    id
    fecha
    credito
    subTotal
    tax
    total
    usuarioNombre
    clienteNombre
    lineas {
      qty
      precio
      descripcion
    }
  }
`;

export const GET_VENTAS = gql`
  query getVentas($filter: String, $take: Int, $skip: Int) {
    ventas(filter: $filter, take: $take, skip: $skip) {
      query {
        ...ventaData
      }
      count
    }
  }
  ${VENTA_DATA}
`;

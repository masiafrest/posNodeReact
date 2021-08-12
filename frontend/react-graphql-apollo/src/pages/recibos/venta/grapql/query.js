import { gql } from "@apollo/client";

export const GET_CLIENTES = gql`
  query getClientes {
    clientes {
      id
      nombre
      telefono
      dirrecion
    }
  }
`;

export const GET_VENTAS = gql`
  query getVentas($filter: String, $take: Int, $skip: Int) {
    ventas(filter: $filter, take: $take, skip: $skip) {
      id
      fecha
      credito
      subTotal
      tax
      total
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
        precio
        descripcion
      }
    }
  }
`;

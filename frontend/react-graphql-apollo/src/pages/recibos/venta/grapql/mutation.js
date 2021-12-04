import { gql } from "@apollo/client";

export const PostVenta = gql`
  mutation PostVenta(
    $cliente: String
    $credito: Boolean
    $subTotal: Float
    $tax: Float
    $total: Float
    $lineas: [VentaLineaInput]
  ) {
    postVenta(
      cliente: $cliente
      credito: $credito
      lineas: $lineas
      subTotal: $subTotal
      tax: $tax
      total: $total
    ) {
      id
      lineas {
        item {
          id
          descripcion
        }
        id
        descripcion
      }
    }
  }
`;

export const UpdateVenta = gql`
  mutation UpdateVenta($id: ID, $credito: Boolean) {
    updateVenta(id: $id, credito: $credito) {
      id
      credito
    }
  }
`;

export const DelVenta = gql`
  mutation DelVenta($id: ID) {
    delVenta(id: $id) {
      id
    }
  }
`;

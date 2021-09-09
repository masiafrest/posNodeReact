import { gql } from "@apollo/client";

export const PostVenta = gql`
  mutation PostVenta(
    $clienteId: ID
    $credito: Boolean
    $subTotal: Float
    $tax: Float
    $total: Float
    $lineas: [VentaLineaInput]
  ) {
    postVenta(
      clienteId: $clienteId
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

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

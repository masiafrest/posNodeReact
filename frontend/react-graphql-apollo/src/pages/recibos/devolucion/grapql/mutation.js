import { gql } from "@apollo/client";

export const PostDevolucion = gql`
  mutation PostDevolucion($clienteId: ID, $lineas: [DevolucionLineaInput]) {
    postVenta(clienteId: $clienteId, lineas: $lineas) {
      id
      lineas {
        item {
          id
          marca
        }
        id
        descripcion
        descripcionDevuelto
      }
    }
  }
`;

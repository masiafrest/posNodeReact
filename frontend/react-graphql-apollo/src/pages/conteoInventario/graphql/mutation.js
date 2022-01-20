import { CONTEO_INV_DATA } from "./query";
import { gql } from "@apollo/client";

export const POST_CONTEO_INV = gql`
  mutation PostConteoInv(
    $categoriaId: Int
    $marcaId: Int
    $itemSkiped: Int
    $usuarioId: Int
    $completed: Boolean
    $deleted: Boolean
  ) {
    postConteoInv(
      categoriaId: $categoriaId
      marcaId: $marcaId
      itemSkiped: $itemSkiped
      usuarioId: $usuarioId
      completed: $completed
      deleted: $deleted
    ) {
      ...conteoInvs
    }
  }
  ${CONTEO_INV_DATA}
`;

export const UPDATE_CONTEO_INV = gql`
  mutation UpdateConteoInv(
  ) {
    updateConteoInv(
    $categoriaId: Int
    $marcaId: Int
    $itemSkiped: Int
    $usuarioId: Int
    $completed: Boolean
    $deleted: Boolean
    ) {
      ...conteoInvs
    }
  }
  ${CONTEO_INV_DATA}
`;

export const DEL_ITEM = gql`
  mutation DelItem($id: Int!) {
    delItem(id: $id) {
      id
      descripcion
    }
  }
`;

import { INV_STARTED_DATA } from "../graphql/query";
import { gql } from "@apollo/client";

export const POST_INV_STARTED = gql`
  mutation PostInvStarted(
    $categoriaId: Int
    $marcaId: Int
    $itemSkiped: Int
    $usuarioId: Int
    $completed: Boolean
    $deleted: Boolean
  ) {
    postInvStarted(
      categoriaId: $categoriaId
      marcaId: $marcaId
      itemSkiped: $itemSkiped
      usuarioId: $usuarioId
      completed: $completed
      deleted: $deleted
    ) {
      ...invStarteds
    }
  }
  ${INV_STARTED_DATA}
`;

export const UPDATE_INV_STARTED = gql`
  mutation UpdateInvStarted(
  ) {
    updateInvStarted(
    $categoriaId: Int
    $marcaId: Int
    $itemSkiped: Int
    $usuarioId: Int
    $completed: Boolean
    $deleted: Boolean
    ) {
      ...invStarteds
    }
  }
  ${INV_STARTED_DATA}
`;

export const DEL_ITEM = gql`
  mutation DelItem($id: Int!) {
    delItem(id: $id) {
      id
      descripcion
    }
  }
`;

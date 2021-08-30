import { useQuery, gql } from "@apollo/client";

export const dataProvider ={
  getItems: (filter, take, skip) => {
    const ITEM_QUERY = gql`{
            items (filter:${filter}, 
            take: ${take}, 
            skip: ${skip}
            ){
              id
              barcode
              sku
              categorias {
                id
                nombre
              }
              precio {
                precio
                precioMin
              }
              ubicacion {
                id
                tipo
                dirrecion
              }
            }
          }`;

    const { data, loading, error } = useQuery(ITEM_QUERY);

    return { data, loading, error };
  };
};

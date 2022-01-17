import getDescription from "./getDescription";

export default function addLinea(
  dispatch,
  pushLinea,
  item,
  reciboTipo = "venta"
) {
  console.log("item add linea item: ", item.marca);
  const {
    id,
    precio: { precio, precioMin },
    categorias,
    caracteristicas,
    modelos,
    color,
    marca,
  } = item;
  const newLinea = {
    id,
    tipo: reciboTipo,
    qty: 1,
    descripcion: getDescription(
      marca,
      modelos,
      color,
      caracteristicas,
      categorias
    ),
    precio,
    precioMin,
  };

  dispatch(pushLinea(newLinea));
}

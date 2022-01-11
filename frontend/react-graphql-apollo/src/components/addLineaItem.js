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
    descripcion: `${marca?.nombre}, ${modelos
      .map((e) => e.nombre)
      .join("/")} | ${color ? `${color?.nombre} |` : ""} ${caracteristicas
      .map((e) => e.nombre)
      .join(", ")}  ${categorias.map((e) => e.nombre).join(", ")}`,
    precio,
    precioMin,
  };

  dispatch(pushLinea(newLinea));
}

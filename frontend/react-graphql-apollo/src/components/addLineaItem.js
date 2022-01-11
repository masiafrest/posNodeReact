export default function addLinea(
  dispatch,
  pushLinea,
  enqueueSnackbar,
  item,
  reciboTipo = "venta"
) {
  console.log("item ", item);
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
    enqueueSnackbar,
  };
  console.log(newLinea.descripcion);

  dispatch(pushLinea(newLinea));
}

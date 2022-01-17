const joinArr = (arr) => {
  return arr.map((e) => e?.nombre).join("/");
};

export default function getDescription(
  marca,
  modelos = [],
  color,
  caracteristicas = [],
  categorias = []
) {
  return `${marca ? marca?.nombre : ""} ${joinArr(modelos)} ${
    color ? color?.nombre : ""
  } ${joinArr(caracteristicas)} ${joinArr(categorias)}`;
}

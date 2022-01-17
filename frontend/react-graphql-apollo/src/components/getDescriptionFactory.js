const joinArr = (arr) => arr.map((e) => e?.nombre).join("/");

export default function getDescription(
  marca,
  modelos,
  color,
  caracteristicas,
  categorias
) {
  return `${marca?.nombre} ${joinArr(modelos)} ${color?.nombre} ${joinArr(
    caracteristicas
  )} ${joinArr(categorias)}`;
}

module.exports = function updateCategorias(newCategorias, oldCategorias) {
  let updateCategorias = { connect: [], disconnect: [] };
  //get item categorias to compare to newCategorias
  //if itemCategorias.id true, newCategorias.id false, disconnect
  const newCategoriaIds = newCategorias.map((e) => e.id);
  const oldCategoriaIds = oldCategorias.map((e) => e.id);
  console.log("newCategoriasIds:", newCategoriaIds);
  console.log("oldCategoriasIds:", oldCategoriaIds);

  //loop newId and compare oldid to connect
  newCategoriaIds.forEach((newId) => {
    if (!oldCategoriaIds.includes(newId)) {
      updateCategorias.connect.push({ id: newId });
    }
  });
  console.log("newCategoria loop:", updateCategorias);

  //loop old to new to disconect
  oldCategoriaIds.forEach((oldId) => {
    if (!newCategoriaIds.includes(oldId)) {
      updateCategorias.disconnect.push({ id: oldId });
    }
  });
  return updateCategorias;
};

module.exports = function updateCategorias(newCategorias, oldCategorias) {
  let updateCategorias = { connectOrCreate: [], disconnect: [] };
  //get item categorias to compare to newCategorias
  //if itemCategorias.nombre true, newCategorias.nombre false, disconnect
  const newName = newCategorias.map((nombre) => nombre);
  const oldName = oldCategorias.map((e) => e.nombre);
  console.log("newCategoriasIds:", newName);
  console.log("oldCategoriasIds:", oldName);

  //loop newNombre and compare oldid to connect
  newName.forEach((newNombre) => {
    if (!oldName.includes(newNombre)) {
      updateCategorias.connectOrCreate.push({
        where: { nombre: newNombre },
        create: { nombre: newNombre },
      });
    }
  });
  console.log("newCategoria loop:", updateCategorias);

  //loop old to new to disconect
  oldName.forEach((oldNombre) => {
    if (!newName.includes(oldNombre)) {
      updateCategorias.disconnect.push({ nombre: oldNombre });
    }
  });
  return updateCategorias;
};

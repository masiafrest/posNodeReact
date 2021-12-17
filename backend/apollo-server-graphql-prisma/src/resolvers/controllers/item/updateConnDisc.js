module.exports = function updateConnDisc(newArr, oldArr) {
  console.log("newArr: ", newArr);
  let updateArr = { connectOrCreate: [], disconnect: [] };
  updateArr.connectOrCreate = newArr.map((nombre) => ({
    where: {
      nombre,
    },
    create: {
      nombre,
    },
  }));
  //get item categorias to compare to newCategorias
  //if itemCategorias.nombre true, newCategorias.nombre false, disconnect
  // const newName = newArr.map((nombre) => nombre);

  const oldName = oldArr.map((e) => e.nombre);
  // console.log("newCategoriasIds:", newArr);
  // console.log("oldCategoriasIds:", oldName);

  //loop newNombre and compare oldid to connect
  // newArr.forEach((newNombre) => {
  //   if (!oldName.includes(newNombre)) {
  //     updateArr.connectOrCreate.push({
  //       where: { nombre: newNombre },
  //       create: { nombre: newNombre },
  //     });
  //   }
  // });
  // console.log("newCategoria loop:", updateArr);

  //loop old to new to disconect
  oldName.forEach((oldNombre) => {
    if (!newArr.includes(oldNombre)) {
      updateArr.disconnect.push({ nombre: oldNombre });
    }
  });
  console.log("updatearr connectOrCreate:", updateArr.connectOrCreate);
  console.log("updatearr disconnect:", updateArr.disconnect);
  return updateArr;
};

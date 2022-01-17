const connectOrCreateArr = (arr) =>
  arr.map((nombre) => connectOrCreateFactory(nombre));

const connectOrCreateFactory = (nombre) => ({
  where: {
    nombre,
  },
  create: {
    nombre,
  },
});

function connectOrCreateAndDisconnectFactory(newArr, oldArr) {
  console.log("newArr: ", newArr);
  let updateArr = { connectOrCreate: [], disconnect: [] };
  updateArr.connectOrCreate = connectOrCreateArr(newArr);

  const oldName = oldArr.map((e) => e.nombre);

  //loop old to new to disconect
  oldName.forEach((oldNombre) => {
    if (!newArr.includes(oldNombre)) {
      updateArr.disconnect.push({ nombre: oldNombre });
    }
  });
  console.log("updatearr connectOrCreate:", updateArr.connectOrCreate);
  console.log("updatearr disconnect:", updateArr.disconnect);
  return updateArr;
}

exports.connectOrCreateArr = connectOrCreateArr;
exports.connectOrCreateFactory = connectOrCreateFactory;
exports.connectOrCreateAndDisconnectFactory =
  connectOrCreateAndDisconnectFactory;

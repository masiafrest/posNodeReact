const APP_SECRET = "secrectWord";

const splitArrBySpace = (filter, type) => {
  return filter.split(" ").map((e) => {
    return type === "item"
      ? {
          search_text: {
            contains: `${e}`.replace("'", ""),
          },
        }
      : {
          nombre: {
            contains: `${e}`.replace("'", ""),
          },
        };
  });
};

module.exports = {
  APP_SECRET,
  splitArrBySpace,
};

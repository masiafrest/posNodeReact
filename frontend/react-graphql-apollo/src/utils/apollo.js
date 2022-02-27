export function modifyCacheOnDelete(cache, id, types) {
  cache.modify({
    fields: {
      [types](existingItems = { query: [] }, { readField }) {
        const newItems = existingItems.query
          ? existingItems.query.filter((itemRef) => {
              return id !== readField("id", itemRef);
            })
          : existingItems.filter((itemRef) => id !== readField("id", itemRef));
        return newItems;
      },
    },
  });
}

export function modifyCacheOnPost(cache, postData, POST_DATA, types) {
  cache.modify({
    fields: {
      [types](existingDatas = []) {
        console.log("existinDatas", existingDatas);
        const newItemRef = cache.writeFragment({
          data: postData,
          fragment: POST_DATA,
        });
        const newData = [...existingDatas.query, newItemRef];
        return newData;
      },
    },
  });
}

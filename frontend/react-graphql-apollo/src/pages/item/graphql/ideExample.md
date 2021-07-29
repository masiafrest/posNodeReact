### item

```
fragment itemData on Item {
  id
  descripcion
  qty
  marca
  modelo
  barcode
  sku
  categorias {
    id
    nombre
  }
  precio {
    precio
    precioMin
  }
  ubicacion {
    id
    tipo
    dirrecion
  }
}

mutation postItem {
  postItem(
    marca: "noke"
    modelo: "sot"
    barcode: 21233
    sku: "xioas"
    precio: 10.10
    precioMin: 9.00
    qty: 10
    descripcion: "pantalla lcd ol negra"
    categorias: [{ id: 1 }]
    ubicacion: { id: 1 }
  ) {
    ...itemData
  }
}

query getItems {
  items(filter: "", skip: 0, take: 5) {
    ...itemData
  }
}

query getItemById {
  item(id: 10) {
    qty
    precio {
      precio
      precioMin
    }
  }
}

mutation update {
  updateItem(id: 6, qty: 20) {
    id
    precio {
      precio
    }
  }
}

mutation DelItem {
  delItem(id: 8) {
    id
  }
}

```

### ubicacion

```
query getUbicaciones{
  ubicaciones{
    id
    tipo
    dirrecion

  }
}
```

### categoria

```
query getCategoria{
  categorias(filter:"",){
    id
    nombre
  }
}

mutation PostCat{
  postCategoria(nombre:"pantalla"){
    nombre
    id
  }
}

mutation UpdateCat{
  updateCategoria(id: 3, nombre:"abc"){
    nombre id
  }
}
```

### cliente

```
mutation PostCliente {
  postCliente(nombre:"dd", telefono:"444d444", dirrecion:"cali"){
    id
    nombre
    telefono
    dirrecion
  }
}

query getClientes{
  clientes(filter:"", skip:0){
    id
    nombre
    telefono
    dirrecion
  }
}

mutation UpdateClient{
  updateCliente(id: 2, nombre:"maxicl"){
    id nombre telefono dirrecion
  }
}

mutation DelClient{
  delCliente(id: 7){
    id nombre
  }
}
```

### singup

```
mutation SignUp{
  signup(nombre:"abc", password:"qwe"){
    token
    usuario{
      id nombre
    }
  }
}

mutation Login {
  login(password:"qwe", nombre:"abc"){
    token
    usuario{
      id
      nombre
      rol

    }
  }
}
```

### recibo venta

```
clienteId: '1',
      credito: false,
      lineas: [
        {
          __typename: 'Item',
          id: '10',
          marca: 'xiai',
          modelo: 'sot',
          barcode: '21233',
          sku: 'xioas',
          descripcion: 'pantalla lcd ol negra',
          qty: 1,
          categorias: [
            {
              __typename: 'Categoria',
              id: '1',
              nombre: 'Lcd'
            }
          ],
          precio: {
            __typename: 'Precio',
            precio: 10.1,
            precioMin: 9
          },
          ubicacion: {
            __typename: 'Ubicacion',
            id: '1',
            tipo: 'tienda',
            dirrecion: 'dorado'
          },
          tipo: 'venta'
        }
      ],
      subTotal: 10.1,
      tax: 0.71,
      total: 10.81
    }
```

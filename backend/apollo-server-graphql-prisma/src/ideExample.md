### item

```
fragment itemData on Item {
  id
  descripcion
  qty
  barcode
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
    barcode: 21233
    precio: 10.10
    precioMin: 9.00
    qty: 10
    descripcion: "hua 79p pantalla lcd ol negra"
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
mutation PostVenta {
  postVenta(
    usuarioId: 1
    clienteId: 1
    credito: false
    lineas: [
      {
        id: 12
        tipo: "venta"
        qty: 1
        descripcion: "xiasdi sot pantalla lcd ol negra"
        precio: 10.1
      }
    ]
    subTotal: 10.1
    tax: 0.71
    total: 10.81
  ) {
    id
    lineas {
      id
      descripcion
    }
  }
}

query GetVentas {
  ventas {
    id
    usuarioId
    usuario {
      id
      nombre
    }
    lineas {
      descripcion
      qty
      precio
    }
    total
  }
}
```

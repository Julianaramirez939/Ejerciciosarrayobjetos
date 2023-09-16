const productos = [
  { nombre: "Producto 1", precio: 10, stock: 5 },
  { nombre: "Producto 2", precio: 20, stock: 8 },
  { nombre: "Producto 3", precio: 15, stock: 3 },
];

const carrito = [];
let productoSeleccionado = null;

function agregarAlCarrito(producto, cantidad = 1) {
  if (producto && producto.stock >= cantidad) {
    for (let i = 0; i < cantidad; i++) {
      carrito.push({ ...producto, cantidad: 1 });
      producto.stock--;
    }
    productoSeleccionado = { ...producto, cantidad };
    alert(`Producto(s) seleccionado(s): ${producto.nombre} - Cantidad: ${cantidad}`);
    return true; // Indicar que la operación fue exitosa
  } else if (producto) {
    alert(`Lo sentimos, no hay suficiente stock de "${producto.nombre}".`);
    return false; // Indicar que la operación falló
  } else {
    alert("Por favor, seleccione un producto primero.");
    return false; // Indicar que la operación falló
  }
}

function mostrarCarrito() {
  let carritoInfo = "Productos en tu carrito:\n";
  carrito.forEach((item) => {
    carritoInfo += `${item.nombre} - Cantidad: ${item.cantidad}\n`;
  });
  alert(carritoInfo);
}

function calcularPrecioTotal() {
  let precioTotal = 0;
  carrito.forEach((item) => {
    precioTotal += item.precio * item.cantidad;
  });
  return precioTotal;
}

function interactuarDesdeConsola() {
  alert("Bienvenido a la aplicación de carrito de compras.");

  let salir = false;

  while (!salir) {
    if (productoSeleccionado) {
      alert("Productos seleccionados:");
      alert(`${productoSeleccionado.nombre} - Cantidad: ${productoSeleccionado.cantidad}`);
      productoSeleccionado = null;
    }

    const opcion = parseInt(prompt("Menú:\n1. Agregar producto al carrito\n2. Mostrar carrito\n3. Calcular precio total\n0. Salir"));

    switch (opcion) {
      case 0:
        alert("¡Gracias por usar la aplicación!");
        salir = true;
        break;
      case 1:
        alert("Productos disponibles:");
        productos.forEach((producto, index) => {
          alert(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`);
        });
        const seleccion = parseInt(prompt("Seleccione un producto por número:"));
        const cantidad = parseInt(prompt("Ingrese la cantidad:"));
        const productoSeleccionado = productos[seleccion - 1];

        agregarAlCarrito(productoSeleccionado, cantidad);
        break;
      case 2:
        if (carrito.length === 0) {
          alert("Tu carrito está vacío.");
        } else {
          mostrarCarrito();
        }
        break;
      case 3:
        if (carrito.length === 0) {
          alert("Tu carrito está vacío.");
        } else {
          alert(`Precio Total de la Compra: $${calcularPrecioTotal()}`);
        }
        break;
      default:
        alert("Opción no válida. Por favor, elija una opción válida.");
    }
  }
}

// Inicia la interacción desde la consola
interactuarDesdeConsola();













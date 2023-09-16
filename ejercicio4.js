// Array para la cola de espera
const colaEspera = [];
// Array para llevar un registro de los turnos tomados
const registroTurnos = [];

// Función para que un cliente tome un turno
function tomarTurno() {
  const numeroTurno = registroTurnos.length + 1; // Calcula el siguiente número de turno
  colaEspera.push(numeroTurno); // Agrega el turno a la cola de espera
  registroTurnos.push(numeroTurno); // Agrega el turno al registro
  return numeroTurno;
}

// Función para que un empleado llame al siguiente cliente en la cola
function llamarCliente() {
  if (colaEspera.length === 0) {
    return "No hay clientes en espera.";
  }
  const numeroTurnoLlamado = colaEspera.shift(); // Obtiene y elimina el primer turno en la cola
  const personasDelante = colaEspera.length;
  const contadorTurnos = obtenerContadorTurnos();
  return `Llamando al cliente con el turno número ${numeroTurnoLlamado}.\nHay ${personasDelante} persona(s) delante de usted. (Total de turnos tomados: ${contadorTurnos})`;
}

// Función para mostrar la cola de espera actual
function mostrarColaEspera() {
  return colaEspera.slice(); // Devolvemos una copia de la cola para evitar modificaciones no deseadas
}

// Función para obtener el contador de turnos
function obtenerContadorTurnos() {
  return registroTurnos.length;
}

// Ejemplo de uso
console.log("Cliente 1 toma un turno:", tomarTurno());
console.log("Cliente 2 toma un turno:", tomarTurno());

console.log("Cola de espera:", mostrarColaEspera()); // Muestra la cola de espera actual

console.log(llamarCliente()); // Empleado llama al cliente 1 y lo elimina de la cola

console.log("Cola de espera:", mostrarColaEspera()); // Muestra la cola de espera actual

console.log("Cliente 3 toma un turno:", tomarTurno());

console.log(llamarCliente()); // Empleado llama al cliente 2 y lo elimina de la cola


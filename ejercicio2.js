
const habitacionesDisponibles = {
  individual: { capacidadMaxima: 2, fumadores: true, mascotas: true },
  doble: { capacidadMaxima: 4, fumadores: true, mascotas: true },
  familiar: { capacidadMaxima: 6, fumadores: true, mascotas: false },
};


const reservas = [];

function hacerReserva() {
  const nombre = prompt("Ingrese su nombre:");
  const pais = prompt("Ingrese su país de origen:");
  const personas = parseInt(prompt("Ingrese el número de personas:"));
  const periodoEstadia = prompt("Ingrese el periodo de estadía (ejemplo: 10/09/2023 - 15/09/2023):");
  const fumadores = prompt("¿Es usted fumador? (Sí o No):").toLowerCase() === "si";
  const tipoHabitacion = prompt("Ingrese el tipo de habitación (individual, doble, familiar):").toLowerCase();
  const tieneMascotas = prompt("¿Tiene mascotas? (Sí o No):").toLowerCase() === "si";


  if (!habitacionesDisponibles[tipoHabitacion]) {
    console.log("Lo sentimos, el tipo de habitación seleccionado no está disponible.");
    return;
  }


  const habitacion = habitacionesDisponibles[tipoHabitacion];


  if (personas > habitacion.capacidadMaxima) {
    console.log("Lo sentimos, la habitación no tiene capacidad suficiente para ese número de personas.");
    return;
  }

  const [fechaInicio, fechaFin] = periodoEstadia.split(" - ");
  const fechaInicioObj = new Date(fechaInicio);
  const fechaFinObj = new Date(fechaFin);
  const duracionEstadia = (fechaFinObj - fechaInicioObj) / (1000 * 60 * 60 * 24); // Duración en días


  if (tipoHabitacion === "familiar" && tieneMascotas === true) {
    console.log("Lo sentimos, en la habitación familiar no se permiten mascotas.");
    return;
  }


  const reserva = {
    nombre,
    pais,
    personas,
    periodoEstadia,
    tipoHabitacion,
    fumadores: fumadores ? "Es fumador" : "No es fumador",
    duracionEstadia: `${duracionEstadia} días`,
    tieneMascotas: tieneMascotas ? "Tiene mascotas" : "No tiene mascotas",
  };

  reservas.push(reserva);

  delete habitacionesDisponibles[tipoHabitacion];

  console.log(`Reserva realizada para ${nombre}. Ha reservado una habitación ${tipoHabitacion} por ${reserva.duracionEstadia}. ${reserva.fumadores}. ${reserva.tieneMascotas}`);

  const hacerOtraReserva = prompt("¿Desea hacer otra reserva? (Sí o No):").toLowerCase() === "si";
  if (hacerOtraReserva) {
    hacerReserva();
  } else {

    console.log(`El hotel tiene ${reservas.length} habitaciones reservadas.`);
  }
}


hacerReserva();



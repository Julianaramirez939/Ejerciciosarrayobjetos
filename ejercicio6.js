// Array para almacenar citas programadas
let citasProgramadas = [];

// Objeto para gestionar información de citas
const gestorCitas = {
  programarCita: function() {
    const nombrePaciente = prompt("Ingrese el nombre del paciente:");
    const fechaCita = prompt("Ingrese la fecha de la cita (formato: DD/MM/AAAA):");
    const horaCita = prompt("Ingrese la hora de la cita (formato: HH:MM AM/PM):");
    const medicoAsignado = prompt("Ingrese el nombre del médico asignado:");

    const nuevaCita = {
      paciente: nombrePaciente,
      fecha: fechaCita,
      hora: horaCita,
      medico: medicoAsignado,
    };

    citasProgramadas.push(nuevaCita);
    alert("Cita programada con éxito.");
  },
  verCitasProgramadas: function() {
    if (citasProgramadas.length === 0) {
      alert("No hay citas programadas.");
    } else {
      // Ordenar las citas por fecha y hora antes de mostrarlas
      const citasOrdenadas = citasProgramadas.slice().sort((a, b) => {
        const fechaA = new Date(a.fecha + " " + a.hora);
        const fechaB = new Date(b.fecha + " " + b.hora);
        return fechaA - fechaB;
      });

      alert("Citas programadas (ordenadas por fecha y hora):\n" + JSON.stringify(citasOrdenadas, null, 2));
    }
  },
  cancelarCita: function() {
    if (citasProgramadas.length === 0) {
      alert("No hay citas programadas para cancelar.");
    } else {
      const indice = parseInt(prompt("Ingrese el índice de la cita a cancelar:"));
      if (isNaN(indice) || indice < 0 || indice >= citasProgramadas.length) {
        alert("Índice inválido.");
      } else {
        const confirmacion = confirm("¿Está seguro de que desea cancelar esta cita?");
        if (confirmacion) {
          const citaCancelada = citasProgramadas.splice(indice, 1)[0];
          alert("Cita cancelada:\n" + JSON.stringify(citaCancelada, null, 2));
        }
      }
    }
  },
};

// Menú de opciones
while (true) {
  const opcion = prompt(
    "Seleccione una opción:\n1. Programar cita\n2. Ver citas programadas\n3. Cancelar cita\n4. Salir"
  );

  switch (opcion) {
    case "1":
      gestorCitas.programarCita();
      break;
    case "2":
      gestorCitas.verCitasProgramadas();
      break;
    case "3":
      gestorCitas.cancelarCita();
      break;
    case "4":
      alert("¡Hasta luego!");
      // Salir del bucle infinito cuando el usuario elige la opción "Salir"
      break; // Usamos break para salir del bucle
    default:
      alert("Opción inválida. Por favor, elija una opción válida.");
  }
}

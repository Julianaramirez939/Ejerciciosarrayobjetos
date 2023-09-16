// Definir variables para las estadísticas
let totalUsuariosAtendidos = 0;
let usuariosAtendidosPorTipo = {
  "Llamada Telefónica": 0,
  "Asesoría Estudiante": 0,
  "Asesoría Directivo": 0,
};

// Función para registrar la atención
function registrarAtencion(cedula, tipoAtencion) {
  totalUsuariosAtendidos++;

  // Actualizar estadísticas según el tipo de atención
  switch (tipoAtencion) {
    case "Llamada Telefónica":
      usuariosAtendidosPorTipo["Llamada Telefónica"]++;
      break;
    case "Asesoría Estudiante":
      usuariosAtendidosPorTipo["Asesoría Estudiante"]++;
      break;
    case "Asesoría Directivo":
      usuariosAtendidosPorTipo["Asesoría Directivo"]++;
      break;
    default:
      console.log("Tipo de atención no válido");
  }

  console.log("Atención registrada para cédula:", cedula);
}

// Ejemplo de uso:
registrarAtencion("123456789", "Llamada Telefónica");
registrarAtencion("987654321", "Asesoría Estudiante");
registrarAtencion("567890123", "Asesoría Directivo");

// Mostrar estadísticas
console.log("Total de usuarios atendidos:", totalUsuariosAtendidos);
console.log("Usuarios atendidos por tipo:");
console.log(usuariosAtendidosPorTipo);

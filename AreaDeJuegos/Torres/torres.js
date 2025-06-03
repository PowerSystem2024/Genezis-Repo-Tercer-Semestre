// Función recursiva que resuelve el problema de las Torres de Hanoi.
// n: número de discos.
// origen: torre de origen.
// destino: torre de destino.
// auxiliar: torre auxiliar.
// log: elemento HTML donde se registran los movimientos.
function hanoi(n, origen, destino, auxiliar, log) {
  // Caso base: si solo hay un disco, se mueve directamente al destino.
  if (n === 1) {
    logMovimiento(`Mover disco 1 de ${origen} a ${destino}`, log);
    return;
  }
  // Paso recursivo: mover n-1 discos del origen al auxiliar usando el destino.
  hanoi(n - 1, origen, auxiliar, destino, log);
  // Registrar el movimiento del disco n al destino.
  logMovimiento(`Mover disco ${n} de ${origen} a ${destino}`, log);
  // Paso recursivo: mover n-1 discos del auxiliar al destino usando el origen.
  hanoi(n - 1, auxiliar, destino, origen, log);
}
//..
// Función que registra un movimiento en el elemento HTML de log.
// mensaje: texto del movimiento.
// logElement: elemento HTML donde se registran los movimientos.
function logMovimiento(mensaje, logElement) {
  // Crear un nuevo elemento <p> para el mensaje.
  const linea = document.createElement("p");
  linea.textContent = mensaje; // Asignar el texto del mensaje.
  logElement.appendChild(linea); // Añadir el mensaje al log.
  logElement.scrollTop = logElement.scrollHeight; // Desplazar el log hacia abajo para mostrar el último movimiento.
}

// Función que inicia la resolución de las Torres de Hanoi.
// Obtiene la cantidad de discos desde un input y valida el rango.
// Luego llama a la función hanoi para resolver el problema.
function resolverHanoi() {
  // Obtener la cantidad de discos desde el input con id "discos".
  const cantidad = parseInt(document.getElementById("discos").value);
  const log = document.getElementById("log"); // Obtener el elemento HTML para el log.
  log.innerHTML = ""; // Limpiar el log antes de comenzar.

  // Validar que la cantidad de discos esté entre 1 y 10.
  if (cantidad < 1 || cantidad > 10) {
    logMovimiento("Por favor ingresa una cantidad válida entre 1 y 10.", log);
    return;
  }

  // Llamar a la función hanoi para resolver el problema.
  hanoi(cantidad, "A", "C", "B", log);
}

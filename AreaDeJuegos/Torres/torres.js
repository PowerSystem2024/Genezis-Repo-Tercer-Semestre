function hanoi(n, origen, destino, auxiliar, log) {
  if (n === 1) {
    logMovimiento(`Mover disco 1 de ${origen} a ${destino}`, log);
    return;
  }
  hanoi(n - 1, origen, auxiliar, destino, log);
  logMovimiento(`Mover disco ${n} de ${origen} a ${destino}`, log);
  hanoi(n - 1, auxiliar, destino, origen, log);
}

function logMovimiento(mensaje, logElement) {
  const linea = document.createElement("p");
  linea.textContent = mensaje;
  logElement.appendChild(linea);
  logElement.scrollTop = logElement.scrollHeight;
}

function resolverHanoi() {
  const cantidad = parseInt(document.getElementById("discos").value);
  const log = document.getElementById("log");
  log.innerHTML = "";

  if (cantidad < 1 || cantidad > 10) {
    logMovimiento("Por favor ingresa una cantidad válida entre 1 y 10.", log);
    return;
  }

  hanoi(cantidad, "A", "C", "B", log);
}

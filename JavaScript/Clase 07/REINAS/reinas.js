document.addEventListener("DOMContentLoaded", () => {
    const N = 8; // Tamaño del tablero NxN (mínimo 8)
    const tablero = []; // Matriz para representar visualmente el tablero
    const posiciones = new Array(N).fill(-1); // Guarda la columna de cada reina por fila
  
    // Crear un tablero vacío (llenamos con strings vacíos)
    for (let i = 0; i < N; i++) {
      tablero[i] = new Array(N).fill('');
    }
  
    // Verifica si se puede colocar una reina en esa fila y columna
    function esSeguro(fila, col) {
      for (let i = 0; i < fila; i++) {
        // Verifica si hay conflicto en columna o diagonales
        if (
          posiciones[i] === col ||                     // Misma columna
          posiciones[i] - i === col - fila ||          // Misma diagonal \
          posiciones[i] + i === col + fila             // Misma diagonal /
        ) {
          return false; // No es seguro
        }
      }
      return true; // Es seguro colocar la reina aquí
    }
  
    // Función recursiva que intenta colocar reinas fila por fila (usa backtracking)
    function ponerReinas(fila) {
      if (fila === N) return true; // Caso base: se colocaron todas las reinas
  
      // Recorremos cada columna de la fila actual
      for (let col = 0; col < N; col++) {
        if (esSeguro(fila, col)) {
          posiciones[fila] = col;     // Guardamos la posición
          tablero[fila][col] = '♛';   // Colocamos visualmente la reina
  
          // Llamamos recursivamente para la siguiente fila (backtrack)
          if (ponerReinas(fila + 1)) return true;
  
          // Si no funcionó, retrocedemos y probamos otra opción (backtrack)
          posiciones[fila] = -1;
          tablero[fila][col] = '';
        }
      }
  
      return false; // No se pudo ubicar reina en esta fila (backtrack)
    }
  
    // Función que muestra el tablero en pantalla
    function mostrar() {
      const div = document.getElementById("tablero");
      let html = "<table>";
  
      for (let i = 0; i < N; i++) {
        html += "<tr>";
        for (let j = 0; j < N; j++) {
          if (tablero[i][j] === '♛') {
            html += "<td class='reina'>♛</td>"; // Casilla con reina
          } else {
            html += "<td></td>"; // Casilla vacía
          }
        }
        html += "</tr>";
      }
  
      html += "</table>";
      div.innerHTML = html;
    }
  
    // Muestra el arreglo de posiciones en pantalla
    function mostrarPosiciones() {
      const pre = document.getElementById("arreglo");
      pre.textContent = JSON.stringify(posiciones);
    }
  
    // Ejecutamos el algoritmo
    if (ponerReinas(0)) {
      mostrar();           // Mostrar tablero con reinas
      mostrarPosiciones(); // Mostrar posiciones como [0, 4, 7, 5, 2, 6, 1, 3]
    } else {
      alert("No se encontró solución.");
    }
  });
  

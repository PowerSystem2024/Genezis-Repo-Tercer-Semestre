document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnResolver");

  btn.addEventListener("click", () => {
    const inputN = document.getElementById("inputN");
    const mensaje = document.getElementById("mensaje");
    const divTablero = document.getElementById("tablero");
    const preArreglo = document.getElementById("arreglo");

    let N = parseInt(inputN.value);
    if (isNaN(N) || N < 8) {
      mensaje.textContent = "Por favor, ingrese un número válido mayor o igual a 8.";
      divTablero.innerHTML = "";
      preArreglo.textContent = "";
      return;
    }

    mensaje.textContent = "";
    preArreglo.textContent = "";

    const tablero = Array.from({ length: N }, () => new Array(N).fill(''));
    const posiciones = new Array(N).fill(-1);

    function renderizarTablero() {
      let html = "<table>";
      for (let i = 0; i < N; i++) {
        html += "<tr>";
        for (let j = 0; j < N; j++) {
          html += tablero[i][j] === '♛'
            ? "<td class='reina'>♛</td>"
            : "<td></td>";
        }
        html += "</tr>";
      }
      html += "</table>";
      divTablero.innerHTML = html;
    }

    function esSeguro(fila, col) {
      for (let i = 0; i < fila; i++) {
        if (
          posiciones[i] === col ||
          posiciones[i] - i === col - fila ||
          posiciones[i] + i === col + fila
        ) {
          return false;
        }
      }
      return true;
    }

    // Algoritmo de backtracking animado
    async function ponerReinasAnimado(fila) {
      if (fila === N) return true;

      for (let col = 0; col < N; col++) {
        if (esSeguro(fila, col)) {
          posiciones[fila] = col;
          tablero[fila][col] = '♛';
          renderizarTablero();
          await new Promise(res => setTimeout(res, 300)); // Espera para animar

          if (await ponerReinasAnimado(fila + 1)) return true;

          // Retroceso
          tablero[fila][col] = '';
          posiciones[fila] = -1;
          renderizarTablero();
          await new Promise(res => setTimeout(res, 300));
        }
      }

      return false;
    }

    ponerReinasAnimado(0).then(result => {
      if (result) {
        preArreglo.textContent = JSON.stringify(posiciones);
      } else {
        mensaje.textContent = "No se encontró solución.";
      }
    });
  });
});

  

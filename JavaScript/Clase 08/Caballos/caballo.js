// --- Elementos del DOM ---
const divTablero = document.getElementById('chessboard');
const botonResolver = document.getElementById('solveButton');
const botonReiniciar = document.getElementById('resetButton');
const divMensaje = document.getElementById('message');

// --- Variables Globales ---
const TAMANO_TABLERO = 8; // Tamaño fijo 8x8
let tablero = [];
let solucionEncontrada = false;

// Movimientos posibles del caballo (cambios en x, y)
const MOVIMIENTOS_CABALLO = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
];

// --- Funciones del Tablero y UI ---

/**
 * Inicializa la estructura del tablero en el DOM y en la matriz JS.
 */
function crearTablero() {
    divTablero.innerHTML = ''; // Limpiar tablero existente
    tablero = Array(TAMANO_TABLERO).fill(0).map(() => Array(TAMANO_TABLERO).fill(0)); // Inicializar con 0s

    divTablero.style.gridTemplateColumns = `repeat(${TAMANO_TABLERO}, 1fr)`;
    // Ajustar el tamaño de las celdas para que el tablero no sea demasiado grande
    const tamanoCelda = 60; // Tamaño fijo de celda
    divTablero.style.width = `${tamanoCelda * TAMANO_TABLERO}px`;
    divTablero.style.height = `${tamanoCelda * TAMANO_TABLERO}px`;

    for (let r = 0; r < TAMANO_TABLERO; r++) {
        for (let c = 0; c < TAMANO_TABLERO; c++) {
            const celda = document.createElement('div');
            celda.classList.add('cell');
            celda.classList.add((r + c) % 2 === 0 ? 'white' : 'black'); // Colores alternados
            celda.dataset.row = r;
            celda.dataset.col = c;
            celda.style.width = `${tamanoCelda}px`;
            celda.style.height = `${tamanoCelda}px`;
            divTablero.appendChild(celda);
        }
    }
    mostrarTablero();
}

/**
 * Actualiza visualmente el tablero con los valores de la matriz 'board'.
 * @param {boolean} clearHighlight Si es true, limpia los highlights de animaciones previas.
 */
function mostrarTablero() {
    const celdas = divTablero.children;
    for (let r = 0; r < TAMANO_TABLERO; r++) {
        for (let c = 0; c < TAMANO_TABLERO; c++) {
            const index = r * TAMANO_TABLERO + c;
            const celda = celdas[index];
            celda.textContent = tablero[r][c] === 0 ? '' : tablero[r][c];
            celda.classList.remove('visited');
            if (tablero[r][c] !== 0) {
                celda.classList.add('visited');
            }
        }
    }
}

/**
 * Muestra un mensaje en la interfaz.
 * @param {string} msg El mensaje a mostrar.
 * @param {string} type Tipo de mensaje ('info', 'success', 'error').
 */
function mostrarMensaje(msg, type = 'info') {
    divMensaje.textContent = msg;
    divMensaje.className = `message ${type}`;
}

// --- Algoritmo de Backtracking (Tour del Caballo) ---

/**
 * Verifica si una celda (r, c) es válida para un movimiento del caballo.
 * Una celda es válida si:
 * 1. Está dentro de los límites del tablero.
 * 2. No ha sido visitada previamente (su valor en 'board' es 0).
 * @param {number} r Fila.
 * @param {number} c Columna.
 * @returns {boolean} True si la celda es válida, false en caso contrario.
 */
function esMovimientoValido(r, c) {
    return (r >= 0 && r < TAMANO_TABLERO && c >= 0 && c < TAMANO_TABLERO && tablero[r][c] === 0);
}

/**
 * Función principal recursiva de backtracking para resolver el Tour del Caballo.
 * @param {number} r Fila actual del caballo.
 * @param {number} c Columna actual del caballo.
 * @param {number} moveCount Número de movimientos realizados hasta ahora (1 a N*N).
 * @returns {boolean} True si se encontró una solución, false en caso contrario.
 */
function resolverTourCaballo(fila, columna, movimientosRealizados) {
    if (solucionEncontrada) {
        return true;
    }

    // Si hemos visitado todas las casillas, encontramos una solución
    if (movimientosRealizados === TAMANO_TABLERO * TAMANO_TABLERO) {
        solucionEncontrada = true;
        return true;
    }

    // Intenta los 8 posibles movimientos del caballo
    for (let i = 0; i < MOVIMIENTOS_CABALLO.length; i++) {
        const siguienteFila = fila + MOVIMIENTOS_CABALLO[i][0];
        const siguienteColumna = columna + MOVIMIENTOS_CABALLO[i][1];

        if (esMovimientoValido(siguienteFila, siguienteColumna)) {
            // Realizar el movimiento
            tablero[siguienteFila][siguienteColumna] = movimientosRealizados + 1;

            // Llamada recursiva
            if (resolverTourCaballo(siguienteFila, siguienteColumna, movimientosRealizados + 1)) {
                return true;
            }

            // Backtracking
            tablero[siguienteFila][siguienteColumna] = 0;
        }
    }

    return false;
}

/**
 * Inicia el proceso de resolución
 */
function iniciarSolucion() {
    mostrarMensaje('Calculando solución...', 'info');
    botonResolver.disabled = true;
    botonReiniciar.disabled = true;

    crearTablero();
    solucionEncontrada = false;

    const filaInicial = 0;
    const columnaInicial = 0;
    tablero[filaInicial][columnaInicial] = 1;

    const tiempoInicio = performance.now();
    const exito = resolverTourCaballo(filaInicial, columnaInicial, 1);
    const tiempoFin = performance.now();
    const tiempoCalculo = (tiempoFin - tiempoInicio).toFixed(2);

    if (exito) {
        mostrarMensaje(`¡Solución encontrada en ${tiempoCalculo} ms!`, 'success');
        mostrarTablero();
    } else {
        mostrarMensaje(`No se encontró solución para un tablero de ${TAMANO_TABLERO}x${TAMANO_TABLERO} desde (0,0).`, 'error');
        mostrarTablero();
    }

    botonResolver.disabled = false;
    botonReiniciar.disabled = false;
}

// --- Event Listeners ---
botonResolver.addEventListener('click', iniciarSolucion);
botonReiniciar.addEventListener('click', crearTablero);

// --- Inicialización al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
    crearTablero();
    mostrarMensaje('Presiona "Resolver Tour" para encontrar el camino del caballo.');
});
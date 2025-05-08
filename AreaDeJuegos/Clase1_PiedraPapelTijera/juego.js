// Código JavaScript para el juego de Piedra, Papel o Tijeras

// Declaramos las variables que vamos a necesitar
// Variables para guardar los puntos
let puntosJugador = 0;
let puntosComputadora = 0;

// Conectamos los elementos del HTML con JavaScript
// Botones de opciones
const botonPiedra = document.getElementById('piedra');
const botonPapel = document.getElementById('papel');
const botonTijeras = document.getElementById('tijeras');

// Botón para reiniciar
const botonReiniciar = document.getElementById('reiniciar');

// Elementos para mostrar información
const elementoResultado = document.getElementById('resultado');
const elementoPuntosJugador = document.getElementById('puntos-jugador');
const elementoPuntosComputadora = document.getElementById('puntos-computadora');

// Eventos - Qué pasa cuando hacemos clic en los botones
botonPiedra.addEventListener('click', function() {
    jugar('piedra');
});

botonPapel.addEventListener('click', function() {
    jugar('papel');
});

botonTijeras.addEventListener('click', function() {
    jugar('tijeras');
});

botonReiniciar.addEventListener('click', function() {
    reiniciarJuego();
});

// Función para obtener una eleccion aleatoria para la computadora
function obtenerEleccionComputadora() {
    // esta función es la que se encarga en genera un número aleatorio para la computadora
    
    // Paso 1: Creamos un número aleatorio entre 0 y 1
    const numeroAleatorio = Math.random();
    
    // Paso 2: Lo multiplicamos por 3 para obtener un número entre 0 y 3 (sin incluir el 3)
    const numeroMultiplicado = numeroAleatorio * 3;
    
    // Paso 3: Redondeamos hacia abajo para obtener 0, 1 o 2
    const numeroRedondeado = Math.floor(numeroMultiplicado);
    
    // Paso 4: Convertimos el número a una opcion (piedra, papel o tijeras)
    if (numeroRedondeado === 0) {
        return 'piedra';
    } else if (numeroRedondeado === 1) {
        return 'papel';
    } else {
        return 'tijeras';
    }
}

// Función principal del juego
function jugar(eleccionJugador) {
    // Obtenemos la elección de la computadora
    const eleccionComputadora = obtenerEleccionComputadora();
    
    // Mostramos lo que eligió cada uno
    elementoResultado.innerHTML = 'Tú elegiste: <strong>' + eleccionJugador + 
                                '</strong> | Computadora eligió: <strong>' + 
                                eleccionComputadora + '</strong><br>';
    
    // Determinamos quién ganó
    if (eleccionJugador === eleccionComputadora) {
        // Si son iguales, es un empate
        elementoResultado.innerHTML += '¡Es un empate!';
    } else if (
        (eleccionJugador === 'piedra' && eleccionComputadora === 'tijeras') ||
        (eleccionJugador === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionJugador === 'tijeras' && eleccionComputadora === 'papel')
    ) {
        // Si se cumple alguna de estas condiciones, gana el jugador
        elementoResultado.innerHTML += '¡Ganaste!';
        puntosJugador++;
        elementoPuntosJugador.textContent = puntosJugador;
    } else {
        // En cualquier otro caso, gana la computadora
        elementoResultado.innerHTML += '¡Perdiste!';
        puntosComputadora++;
        elementoPuntosComputadora.textContent = puntosComputadora;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciamos los puntos
    puntosJugador = 0;
    puntosComputadora = 0;
    
    // Actualizamos los marcadores en pantalla
    elementoPuntosJugador.textContent = puntosJugador;
    elementoPuntosComputadora.textContent = puntosComputadora;
    
    // Reiniciamos el mensaje de resultado
    elementoResultado.textContent = 'Esperando tu elección...';
}
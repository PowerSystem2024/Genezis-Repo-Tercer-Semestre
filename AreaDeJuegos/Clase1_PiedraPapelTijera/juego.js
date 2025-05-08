let puntosJugador = 0, puntosComputadora = 0;

const botones = document.querySelectorAll('.botones button');
const resultado = document.getElementById('resultado');
const puntosJugadorElem = document.getElementById('puntos-jugador');
const puntosComputadoraElem = document.getElementById('puntos-computadora');

botones.forEach(boton => boton.addEventListener('click', () => jugar(boton.id)));
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

function obtenerEleccionComputadora() {
    return ['piedra', 'papel', 'tijeras'][Math.floor(Math.random() * 3)];
}

function jugar(eleccionJugador) {
    const eleccionComputadora = obtenerEleccionComputadora();
    resultado.innerHTML = `Tú: <strong>${eleccionJugador}</strong> | Computadora: <strong>${eleccionComputadora}</strong><br>`;
    
    if (eleccionJugador === eleccionComputadora) {
        resultado.innerHTML += '¡Empate!';
    } else if (
        (eleccionJugador === 'piedra' && eleccionComputadora === 'tijeras') ||
        (eleccionJugador === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionJugador === 'tijeras' && eleccionComputadora === 'papel')
    ) {
        resultado.innerHTML += '¡Ganaste!';
        puntosJugadorElem.textContent = ++puntosJugador;
    } else {
        resultado.innerHTML += '¡Perdiste!';
        puntosComputadoraElem.textContent = ++puntosComputadora;
    }
}

function reiniciarJuego() {
    puntosJugador = puntosComputadora = 0;
    puntosJugadorElem.textContent = puntosComputadoraElem.textContent = 0;
    resultado.textContent = 'Esperando tu elección...';
}
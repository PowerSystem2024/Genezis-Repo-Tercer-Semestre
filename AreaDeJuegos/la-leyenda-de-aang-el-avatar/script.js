// Variables globales del juego
let personajeJugador = null;
let personajePC = null;
let ataqueSeleccionado = null;
let vidaJugador = 100;
let vidaPC = 100;
let juegoTerminado = false;

// Referencias a elementos del DOM
const pantallaSeleccion = document.getElementById('pantallaSeleccion');
const pantallaCombate = document.getElementById('pantallaCombate');
const botonesPersonaje = document.querySelectorAll('.personaje');
const btnCombate = document.getElementById('btnCombate');
const botonesAtaque = document.querySelectorAll('.boton-ataque');
const btnAtacar = document.getElementById('btnAtacar');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensajesCombate = document.getElementById('mensajesCombate');
const pcCharacterReel = document.getElementById('pc-character-reel');
const modalReglas = document.getElementById('modalReglas');
const btnReglas = document.getElementById('btnReglas');
const btnReglasCombate = document.getElementById('btnReglasCombate');
const cerrarModal = document.querySelector('.cerrar-modal');
const modalOponente = document.getElementById('modalOponente');
const oponenteReveladoTexto = document.getElementById('oponente-revelado-texto');

// Datos del juego
const personajes = {
    'Aang': { imagen: 'assets/aang.png', fortaleza: 'barrida', debilidad: 'punio' },
    'Katara': { imagen: 'assets/katara.png', fortaleza: 'punio', debilidad: 'patada' },
    'Toph': { imagen: 'assets/toph.png', fortaleza: 'patada', debilidad: 'barrida' },
    'Zuko': { imagen: 'assets/zuko.png', fortaleza: 'punio', debilidad: 'barrida' }
};
const ataques = {
    'punio': { nombre: 'Puño', dano: 20 },
    'patada': { nombre: 'Patada', dano: 25 },
    'barrida': { nombre: 'Barrida', dano: 15 }
};

// --- Lógica de Selección y Animación ---
function poblarCarrete() {
    pcCharacterReel.innerHTML = '';
    const nombres = Object.keys(personajes);
    const carreteCompleto = [...nombres, ...nombres, ...nombres];
    carreteCompleto.forEach(nombre => {
        const img = document.createElement('img');
        img.src = personajes[nombre].imagen;
        pcCharacterReel.appendChild(img);
    });
}

function iniciarAnimacionOponente() {
    oponenteReveladoTexto.classList.remove('visible');
    oponenteReveladoTexto.textContent = '';
    modalOponente.style.display = 'block';

    const nombres = Object.keys(personajes);
    const alturaPersonaje = 120;
    personajePC = seleccionarPersonajePC();
    
    const indiceFinal = nombres.indexOf(personajePC) + nombres.length;
    const posicionFinal = -(indiceFinal * alturaPersonaje);

    setTimeout(() => {
        const posGiroRapido = -(Math.floor(Math.random() * nombres.length) * alturaPersonaje);
        pcCharacterReel.style.transition = 'transform 0.1s linear';
        pcCharacterReel.style.transform = `translateY(${posGiroRapido}px)`;
        setTimeout(() => {
            pcCharacterReel.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1)';
            pcCharacterReel.style.transform = `translateY(${posicionFinal}px)`;
        }, 150);
    }, 100);

    setTimeout(() => {
        oponenteReveladoTexto.textContent = `¡Tu oponente es ${personajePC}!`;
        oponenteReveladoTexto.classList.add('visible');
        setTimeout(() => {
            modalOponente.style.display = 'none';
            btnCombate.disabled = false;
        }, 2000);
    }, 2800);
}

// --- Lógica de Combate ---
function seleccionarPersonajePC() {
    const oponentesPosibles = Object.keys(personajes).filter(p => p !== personajeJugador);
    return oponentesPosibles[Math.floor(Math.random() * oponentesPosibles.length)];
}

function calcularDano(atacante, tipoAtaque) {
    let dano = ataques[tipoAtaque].dano;
    const variacion = 0.8 + Math.random() * 0.4;
    let esCritico = false;
    if (personajes[atacante].fortaleza === tipoAtaque) { dano *= 1.5; esCritico = true; } 
    else if (personajes[atacante].debilidad === tipoAtaque) { dano *= 0.7; }
    return { dano: Math.round(dano * variacion), critico: esCritico };
}

function registrarDano(atacante, dano, critico) {
    mensajesCombate.innerHTML += `<div class="mensaje ${critico ? 'critico' : ''}">${atacante} ➜ ${dano} de daño${critico ? ' (¡Crítico!)' : ''}</div>`;
    mensajesCombate.scrollTop = mensajesCombate.scrollHeight;
}

function actualizarBarrasVida() {
    document.getElementById('vidaJugador').style.width = `${Math.max(0, vidaJugador)}%`;
    document.getElementById('textoVidaJugador').textContent = `${Math.max(0, vidaJugador)}/100`;
    document.getElementById('vidaPC').style.width = `${Math.max(0, vidaPC)}%`;
    document.getElementById('textoVidaPC').textContent = `${Math.max(0, vidaPC)}/100`;
}

function finalizarJuego(victoria) {
    juegoTerminado = true;
    [btnAtacar, ...botonesAtaque].forEach(b => b.disabled = true);
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = `resultado-final ${victoria ? 'victoria' : 'derrota'}`;
    resultadoDiv.innerHTML = `<h2>${victoria ? '¡Victoria!' : '¡Derrota!'}</h2><p>${victoria ? 'Has ganado el combate.' : `${personajePC} ha ganado.`}</p>`;
    pantallaCombate.insertBefore(resultadoDiv, document.querySelector('.combate-principal'));
}

function ataquePC() {
    const tipoAtaque = Object.keys(ataques)[Math.floor(Math.random() * 3)];
    const resultado = calcularDano(personajePC, tipoAtaque);
    vidaJugador -= resultado.dano;
    registrarDano(personajePC, resultado.dano, resultado.critico);
    actualizarBarrasVida();
    if (vidaJugador <= 0) finalizarJuego(false);
    else [btnAtacar, ...botonesAtaque].forEach(b => b.disabled = false);
}

// --- Event Listeners ---
botonesPersonaje.forEach(boton => {
    boton.addEventListener('click', () => {
        if (personajeJugador) return;
        personajeJugador = boton.dataset.nombre;
        boton.classList.add('seleccionado');
        botonesPersonaje.forEach(b => b.disabled = true);
        iniciarAnimacionOponente();
    });
});

btnCombate.addEventListener('click', () => {
    document.getElementById('nombreJugador').textContent = personajeJugador;
    document.getElementById('nombrePC').textContent = personajePC;
    document.getElementById('imagenJugador').src = personajes[personajeJugador].imagen;
    document.getElementById('imagenPC').src = personajes[personajePC].imagen;
    pantallaSeleccion.style.display = 'none';
    pantallaCombate.style.display = 'block';
});

botonesAtaque.forEach(boton => {
    boton.addEventListener('click', () => {
        ataqueSeleccionado = boton.dataset.ataque;
        botonesAtaque.forEach(b => b.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');
        btnAtacar.disabled = false;
    });
});

btnAtacar.addEventListener('click', () => {
    if (!ataqueSeleccionado || juegoTerminado) return;
    [btnAtacar, ...botonesAtaque].forEach(b => b.disabled = true);

    const resultado = calcularDano(personajeJugador, ataqueSeleccionado);
    vidaPC -= resultado.dano;
    registrarDano(personajeJugador, resultado.dano, resultado.critico);
    actualizarBarrasVida();

    if (vidaPC <= 0) {
        finalizarJuego(true);
    } else {
        setTimeout(ataquePC, 2000);
    }
});

btnReiniciar.addEventListener('click', () => location.reload());
btnReglas.addEventListener('click', () => modalReglas.style.display = 'block');
btnReglasCombate.addEventListener('click', () => modalReglas.style.display = 'block');
cerrarModal.addEventListener('click', () => modalReglas.style.display = 'none');
window.addEventListener('load', poblarCarrete);
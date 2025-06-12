// Variables globales del juego
    let personajeJugadorSeleccionado = null;
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
    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnCombate = document.getElementById('btnCombate');
    const botonesAtaque = document.querySelectorAll('.boton-ataque');
    const btnAtacar = document.getElementById('btnAtacar');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const mensajesCombate = document.getElementById('mensajesCombate');

    // Referencias para el modal de reglas
    const modalReglas = document.getElementById('modalReglas');
    const btnReglas = document.getElementById('btnReglas');
    const btnReglasCombate = document.getElementById('btnReglasCombate');
    const cerrarModal = document.querySelector('.cerrar-modal');

    // Datos de los personajes
    const personajes = {
      'Aang': { elemento: '💨', imagen: 'assets/aang.png', fortaleza: 'barrida', debilidad: 'punio' },
      'Katara': { elemento: '🌊', imagen: 'assets/katara.png', fortaleza: 'punio', debilidad: 'patada' },
      'Toph': { elemento: '🪨', imagen: 'assets/toph.png', fortaleza: 'patada', debilidad: 'barrida' },
      'Zuko': { elemento: '🔥', imagen: 'assets/zuko.png', fortaleza: 'punio', debilidad: 'barrida' }
    };

    // Datos de los ataques
    const ataques = {
      'punio': { nombre: 'Puño', dano: 20, icono: '👊' },
      'patada': { nombre: 'Patada', dano: 25, icono: '🦵' },
      'barrida': { nombre: 'Barrida', dano: 15, icono: '🌀' }
    };

    // Función para seleccionar personaje aleatorio para la PC
    function seleccionarPersonajePC() {
      const nombresPersonajes = Object.keys(personajes);
      const indiceAleatorio = Math.floor(Math.random() * nombresPersonajes.length);
      return nombresPersonajes[indiceAleatorio];
    }

    // Función para calcular daño
    function calcularDano(atacante, defensor, tipoAtaque) {
      let dano = ataques[tipoAtaque].dano;
      
      // Verificar fortalezas y debilidades
      if (personajes[atacante].fortaleza === tipoAtaque) {
        dano *= 1.5; // Daño aumentado por fortaleza
        return { dano: Math.round(dano), critico: true, tipo: 'fortaleza' };
      } else if (personajes[atacante].debilidad === tipoAtaque) {
        dano *= 0.7; // Daño reducido por debilidad
        return { dano: Math.round(dano), critico: false, tipo: 'debilidad' };
      }
      
      // Agregar variación aleatoria
      const variacion = 0.8 + Math.random() * 0.4; // Entre 0.8 y 1.2
      dano *= variacion;
      
      return { dano: Math.round(dano), critico: false, tipo: 'normal' };
    }

    // Función para agregar mensaje al combate
    function agregarMensaje(texto, critico = false) {
      const mensaje = document.createElement('div');
      mensaje.className = `mensaje ${critico ? 'critico' : ''}`;
      mensaje.textContent = texto;
      mensajesCombate.appendChild(mensaje);
      mensajesCombate.scrollTop = mensajesCombate.scrollHeight;
    }

    // Función para actualizar barras de vida
    function actualizarBarrasVida() {
      const porcentajeJugador = (vidaJugador / 100) * 100;
      const porcentajePC = (vidaPC / 100) * 100;
      
      document.getElementById('vidaJugador').style.width = `${porcentajeJugador}%`;
      document.getElementById('vidaPC').style.width = `${porcentajePC}%`;
      document.getElementById('textoVidaJugador').textContent = `${vidaJugador}/100`;
      document.getElementById('textoVidaPC').textContent = `${vidaPC}/100`;
    }

    // Función para verificar fin del juego
    function verificarFinJuego() {
      if (vidaJugador <= 0) {
        finalizarJuego(false);
        return true;
      } else if (vidaPC <= 0) {
        finalizarJuego(true);
        return true;
      }
      return false;
    }

    // Función para finalizar el juego
    function finalizarJuego(victoria) {
      juegoTerminado = true;
      botonesAtaque.forEach(btn => btn.disabled = true);
      btnAtacar.disabled = true;
      
      const resultado = document.createElement('div');
      resultado.className = `resultado-final ${victoria ? 'victoria' : 'derrota'}`;
      resultado.innerHTML = `
        <h2>${victoria ? '¡Victoria!' : '¡Derrota!'}</h2>
        <p>${victoria ? 
          `¡Felicidades! ${personajeJugador} ha ganado el combate.` : 
          `${personajePC} ha ganado el combate. ¡Mejor suerte la próxima vez!`
        }</p>
      `;
      
      pantallaCombate.appendChild(resultado);
      
      setTimeout(() => {
        agregarMensaje(victoria ? '🎉 ¡Has ganado el combate!' : '💀 Has sido derrotado...', !victoria);
      }, 500);
    }

    // Función para realizar ataque de la PC
    function ataquePC() {
      const tiposAtaque = Object.keys(ataques);
      const ataquePC = tiposAtaque[Math.floor(Math.random() * tiposAtaque.length)];
      
      const resultadoDano = calcularDano(personajePC, personajeJugador, ataquePC);
      vidaJugador = Math.max(0, vidaJugador - resultadoDano.dano);
      
      let mensaje = `${personajePC} usa ${ataques[ataquePC].nombre} ${ataques[ataquePC].icono} y causa ${resultadoDano.dano} de daño`;
      
      if (resultadoDano.tipo === 'fortaleza') {
        mensaje += ' ¡Ataque crítico!';
      } else if (resultadoDano.tipo === 'debilidad') {
        mensaje += ' (Ataque débil)';
      }
      
      agregarMensaje(mensaje, resultadoDano.critico);
      actualizarBarrasVida();
      
      return !verificarFinJuego();
    }

    // Event listeners para selección de personajes
    botonesPersonaje.forEach(boton => {
      boton.addEventListener('click', () => {
        botonesPersonaje.forEach(btn => btn.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');
        personajeJugadorSeleccionado = boton.dataset.nombre;
        btnConfirmar.disabled = false;
      });
    });

    // Event listener para confirmar selección
    btnConfirmar.addEventListener('click', () => {
      if (personajeJugadorSeleccionado) {
        btnCombate.disabled = false;
        btnConfirmar.disabled = true;
        agregarMensaje(`Has seleccionado a ${personajeJugadorSeleccionado}!`);
      }
    });

    // Event listener para iniciar combate
    btnCombate.addEventListener('click', () => {
      if (personajeJugadorSeleccionado) {
        personajeJugador = personajeJugadorSeleccionado;
        personajePC = seleccionarPersonajePC();
        
        // Configurar interfaz de combate
        document.getElementById('nombreJugador').textContent = personajeJugador;
        document.getElementById('nombrePC').textContent = personajePC;
        document.getElementById('imagenJugador').src = personajes[personajeJugador].imagen;
        document.getElementById('imagenPC').src = personajes[personajePC].imagen;
        
        // Cambiar a pantalla de combate
        pantallaSeleccion.style.display = 'none';
        pantallaCombate.style.display = 'block';
        
        // Inicializar combate
        agregarMensaje(`¡Combate iniciado! ${personajeJugador} vs ${personajePC}`);
        agregarMensaje(`Fortaleza de ${personajeJugador}: ${ataques[personajes[personajeJugador].fortaleza].nombre}`);
        agregarMensaje(`Debilidad de ${personajeJugador}: ${ataques[personajes[personajeJugador].debilidad].nombre}`);
      }
    });

    // Event listeners para botones de ataque
    botonesAtaque.forEach(boton => {
      boton.addEventListener('click', () => {
        if (juegoTerminado) return;
        
        botonesAtaque.forEach(btn => btn.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');
        ataqueSeleccionado = boton.dataset.ataque;
        btnAtacar.disabled = false;
      });
    });

    // Event listener para atacar
    btnAtacar.addEventListener('click', () => {
      if (!ataqueSeleccionado || juegoTerminado) return;
      
      // Ataque del jugador
      const resultadoDano = calcularDano(personajeJugador, personajePC, ataqueSeleccionado);
      vidaPC = Math.max(0, vidaPC - resultadoDano.dano);
      
      let mensaje = `Usas ${ataques[ataqueSeleccionado].nombre} ${ataques[ataqueSeleccionado].icono} y causas ${resultadoDano.dano} de daño`;
      
      if (resultadoDano.tipo === 'fortaleza') {
        mensaje += ' ¡Ataque crítico!';
      } else if (resultadoDano.tipo === 'debilidad') {
        mensaje += ' (Ataque débil)';
      }
      
      agregarMensaje(mensaje, resultadoDano.critico);
      actualizarBarrasVida();
      
      // Verificar si la PC fue derrotada
      if (!verificarFinJuego()) {
        // Turno de la PC
        setTimeout(() => {
          if (ataquePC()) {
            // Resetear selección para el siguiente turno
            botonesAtaque.forEach(btn => btn.classList.remove('seleccionado'));
            ataqueSeleccionado = null;
            btnAtacar.disabled = true;
          }
        }, 1500);
      }
    });

    // Event listener para reiniciar
    btnReiniciar.addEventListener('click', () => {
      location.reload();
    });

    // Event listeners para el modal
    btnReglas.addEventListener('click', () => {
      modalReglas.style.display = 'block';
    });

    btnReglasCombate.addEventListener('click', () => {
      modalReglas.style.display = 'block';
    });

    cerrarModal.addEventListener('click', () => {
      modalReglas.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modalReglas) {
        modalReglas.style.display = 'none';
      }
    });

    // Tecla Escape para cerrar el modal
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalReglas.style.display === 'block') {
        modalReglas.style.display = 'none';
      }
    });

    // Inicialización
    window.addEventListener('load', () => {
      console.log("Juego Avatar cargado y listo!");
    });
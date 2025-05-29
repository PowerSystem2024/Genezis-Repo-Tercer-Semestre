// Variable para almacenar el personaje seleccionado por el jugador
let personajeJugadorSeleccionado = null;

// Referencia al contenedor de los personajes
const seccionPersonajes = document.getElementById('personajesSeleccion');

// Selecciona todos los botones que representan personajes
const botonesPersonaje = document.querySelectorAll('.personaje'); // Si usaste <button>

// Referencias a los botones de acción
const btnConfirmar = document.getElementById('btnConfirmar'); // Botón para confirmar selección
const btnCombate = document.getElementById('btnCombate'); // Botón para iniciar el combate

// Función para que la PC elija un personaje aleatoriamente
function aleatoria() {
  // Lista de nombres de personajes disponibles
  const personajes = ['Aang', 'Katara', 'Toph', 'Zuko'];
  
  // Selecciona un índice aleatorio de la lista
  const indiceAleatorio = Math.floor(Math.random() * personajes.length);
  
  // Obtiene el nombre del personaje seleccionado
  const personajePC = personajes[indiceAleatorio];
  
  // Muestra el personaje elegido por la PC
  console.log(`La PC ha elegido a ${personajePC}`);
  alert(`La PC ha elegido a ${personajePC}`);
  
  return personajePC; // Devuelve el personaje seleccionado
}

// Agrega un evento a cada botón de personaje
botonesPersonaje.forEach(boton => {
  boton.addEventListener('click', () => {
    // Elimina la clase 'seleccionado' de todos los botones
    botonesPersonaje.forEach(btn => btn.classList.remove('seleccionado'));
    // Agrega la clase 'seleccionado' al botón clickeado
    boton.classList.add('seleccionado');

    // Guarda el nombre del personaje seleccionado en la variable
    personajeJugadorSeleccionado = boton.dataset.nombre; 
    console.log("Personaje elegido:", personajeJugadorSeleccionado); // Muestra en consola el personaje elegido

    // Habilita el botón de confirmar selección
    btnConfirmar.disabled = false; 
  });
});

// Evento para el botón de confirmar selección
btnConfirmar.addEventListener('click', () => {
  if (personajeJugadorSeleccionado) {
    // Muestra un mensaje de confirmación con el personaje seleccionado
    alert(`Has confirmado a ${personajeJugadorSeleccionado}!`);
    // Habilita el botón de combate y deshabilita el de confirmar
    btnCombate.disabled = false; 
    btnConfirmar.disabled = true; 
  } else {
    // Muestra un mensaje de error si no se seleccionó un personaje
    alert("Por favor, selecciona un personaje primero.");
  }
});

// Evento para el botón de iniciar combate
btnCombate.addEventListener('click', () => {
  if (personajeJugadorSeleccionado) {
    // La PC elige su personaje
    const personajePC = aleatoria();
    // Muestra un mensaje indicando que el combate ha comenzado
    alert(`¡Combate iniciado! Tú: ${personajeJugadorSeleccionado} vs PC: ${personajePC}`);
  } else {
    // Muestra un mensaje de error si no hay personaje seleccionado
    alert("Error: Ningún personaje seleccionado para el combate.");
  }
});

// Evento que se ejecuta cuando la página termina de cargar
window.addEventListener('load', () => {
  console.log("Página de selección de personaje cargada."); // Mensaje en consola para indicar que la página está lista
});

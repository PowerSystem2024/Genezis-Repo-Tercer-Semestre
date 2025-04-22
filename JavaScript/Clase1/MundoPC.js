
// Clase base que representa un dispositivo de entrada como un teclado o ratón
class DispositivoEntrada {
    constructor(tipoEntrada, marca) {
        this.tipoEntrada = tipoEntrada; // Ejemplo: USB, Bluetooth
        this.marca = marca;
    }

    get tipoEntrada() {
        return this._tipoEntrada;
    }

    set tipoEntrada(tipoEntrada) {
        this._tipoEntrada = tipoEntrada;
    }

    get marca() {
        return this._marca;
    }

    set marca(marca) {
        this._marca = marca;
    }

    toString() {
        return `Tipo de Entrada: ${this.tipoEntrada}, Marca: ${this.marca}`;
    }
}

// Clase Raton hereda de DispositivoEntrada
class Raton extends DispositivoEntrada {
    static contadorRatones = 0; // Contador estático para asignar IDs únicos

    constructor(tipoEntrada, marca) {
        super(tipoEntrada, marca);
        this.idRaton = ++Raton.contadorRatones;
    }

    toString() {
        return `Ratón [ID: ${this.idRaton}] - ${super.toString()}`;
    }
}

// Clase Teclado hereda de DispositivoEntrada
class Teclado extends DispositivoEntrada {
    static contadorTeclados = 0;

    constructor(tipoEntrada, marca) {
        super(tipoEntrada, marca);
        this.idTeclado = ++Teclado.contadorTeclados;
    }

    toString() {
        return `Teclado [ID: ${this.idTeclado}] - ${super.toString()}`;
    }
}

// Clase Monitor independiente
class Monitor {
    static contadorMonitores = 0;

    constructor(marca, tamanio) {
        this.idMonitor = ++Monitor.contadorMonitores;
        this.marca = marca;
        this.tamanio = tamanio;
    }

    toString() {
        return `Monitor [ID: ${this.idMonitor}] - Marca: ${this.marca}, Tamaño: ${this.tamanio}`;
    }
}

// Clase Computadora que compone un Monitor, Teclado y Ratón
class Computadora {
    static contadorComputadoras = 0;

    constructor(nombre, monitor, teclado, raton) {
        this.idComputadora = ++Computadora.contadorComputadoras;
        this.nombre = nombre;
        this.monitor = monitor;
        this.teclado = teclado;
        this.raton = raton;
    }

    toString() {
        return `Computadora [ID: ${this.idComputadora}, Nombre: ${this.nombre}]
  ${this.monitor.toString()}
  ${this.teclado.toString()}
  ${this.raton.toString()}`;
    }
}

// Clase Orden que agrupa computadoras
class Orden {
    static contadorOrdenes = 0;

    constructor() {
        this._idOrden = ++Orden.contadorOrdenes;
        this._computadoras = []; // Array de computadoras
    }

    agregarComputadora(computadora) {
        this._computadoras.push(computadora);
    }

    mostrarOrden() {
        let computadorasStr = '';
        for (let comp of this._computadoras) {
            computadorasStr += comp.toString() + '\n';
        }
        console.log(`Orden [ID: ${this._idOrden}] contiene:\n${computadorasStr}`);
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//Test de las clases
// Crear dispositivos de entrada

// Crear objetos
const raton1 = new Raton('USB', 'Logitech');
const teclado1 = new Teclado('Bluetooth', 'Redragon');
const monitor1 = new Monitor('LG', '27 pulgadas');

// Computadora 1
const computadora1 = new Computadora('Gamer Pro', monitor1, teclado1, raton1);

// Otra computadora
const raton2 = new Raton('Bluetooth', 'HP');
const teclado2 = new Teclado('USB', 'Genius');
const monitor2 = new Monitor('Samsung', '24 pulgadas');

const computadora2 = new Computadora('Oficina', monitor2, teclado2, raton2);

// Crear una orden y agregar computadoras
const orden1 = new Orden();
orden1.agregarComputadora(computadora1);
orden1.agregarComputadora(computadora2);

// Mostrar orden
orden1.mostrarOrden();

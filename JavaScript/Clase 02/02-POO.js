class Empleado {
    constructor(nombre, salario) {
        this._nombre = nombre;
        this._salario = salario;
    }

    obtenerDetalles() {
        return `Empleado:  nombre: ${this._nombre}, 
        Salario: ${this._salario}`;
    }
}

class Gerente extends Empleado {
    constructor(nombre, salario, departamento) {
        super(nombre, salario);
        this._departamento = departamento;
    }

    //Agregamos la sobreescritura
    obtenerDetalles() {
        return `Gerente: ${super.obtenerDetalles()}, 
        Departamento: ${this._departamento}`;
    }
}

let gerente1 = new Gerente("Juan", 5000, "Sistemas");
console.log(gerente1); //Objeto de la clase hija

let empleado1 = new Empleado("Carlos", 2000);
console.log(empleado1); //Objeto de la clase padre
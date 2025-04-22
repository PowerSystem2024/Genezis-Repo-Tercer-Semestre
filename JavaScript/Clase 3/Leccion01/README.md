## 📦 Clase Orden
La clase Orden representa una compra o conjunto de computadoras que se agrupan dentro de una misma orden. Su función principal es administrar una lista de computadoras agregadas por el usuario y mostrarlas agrupadas bajo un identificador único.
--

## 🧱 Estructura y funcionamiento:
Atributos:

static contadorOrdenes: Es una propiedad estática que lleva el conteo total de órdenes creadas. Se incrementa cada vez que se instancia una nueva orden.

_idOrden: Es el identificador único de la orden, asignado automáticamente usando contadorOrdenes.

_computadoras: Es un arreglo que contiene los objetos Computadora agregados a esta orden.

Constructor:

```xml
javascript
Copiar
Editar
constructor() {
    this._idOrden = ++Orden.contadorOrdenes;
    this._computadoras = [];
}
```

Al crear una nueva orden, se le asigna un ID automático y se inicializa el arreglo vacío para almacenar computadoras.

Método agregarComputadora(computadora): Permite añadir una computadora al arreglo _computadoras. Se pueden agregar múltiples computadoras a una misma orden, incluso repetidas.

Método mostrarOrden(): Recorre todas las computadoras agregadas y muestra su información usando su método toString(), agrupándolas bajo el mismo ID de orden.

Ejemplo de salida:

```yaml
Copiar
Editar
Orden: 1, Computadoras:
Computadora: [idComputadora: 1, nombre: Asus, ...]
Computadora: [idComputadora: 2, nombre: MSI, ...]
```
--

💡 Relación con Polimorfismo
Aunque la clase Orden no aplica directamente polimorfismo, se beneficia del mismo gracias a que internamente usa el método toString() de cada Computadora, y a su vez cada computadora utiliza los métodos toString() de Raton, Teclado y Monitor. Esto significa que cada parte de la computadora se imprime con su propia lógica, aunque se use un mismo método de forma uniforme.

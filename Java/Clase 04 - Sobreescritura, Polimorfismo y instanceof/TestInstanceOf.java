package Java;

// Clase de prueba para el uso de instanceof y herencia
public class TestInstanceOf{
    public static void main(String[] args) {
        // Se crea un objeto Empleado
        Empleado empleado1 = new Empleado("Juan", 10000);
        // Se puede probar el método con un Empleado
        // determinarTipo(empleado1);

        // Se asigna un objeto Gerente a la variable de tipo Empleado (polimorfismo)
        empleado1 = new Gerente("Jose", 5000, "Sistemas");
        // Se determina el tipo real del objeto referenciado
        determinarTipo(empleado1);
    }

    // Método para identificar el tipo de objeto usando instanceof
    public static void determinarTipo(Empleado empleado) {
        if (empleado instanceof Gerente) { 
            System.out.println("Es de tipo Gerente");
            // Se realiza un downcasting para acceder a métodos de Gerente
            Gerente gerente = (Gerente) empleado; 
            System.out.println("Aread del Gerente: " + gerente.getDepartamento());

        } else if (empleado instanceof Empleado) { 
            System.out.println("Es de tipo Empleado");
        } else if (empleado instanceof Object) {
            System.out.println("Es de tipo Object");
        } else {
            System.out.println("Tipo desconocido");
        }
    }
}
package Java;

public class Main {
    public static void main(String[] args) {
        // Se crea un objeto de tipo Empleado
        Empleado empleado1 = new Empleado("Juan", 10000);
        // Se imprime la información del empleado
        imprimir(empleado1);
        // Se asigna un objeto Gerente a la variable empleado1 (polimorfismo)
        empleado1 = new Gerente("Jose", 5000, "Sistemas");
        // Se imprime la información del gerente
        imprimir(empleado1);
    }

    public static void imprimir(Empleado empleado) {
        String detalles = empleado.ObtenerDetelles();
        System.out.println("Detalles: \n\t" + detalles);
    }
}

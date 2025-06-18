package Java;

public class Empleado {
    protected String nombre;
    protected double sueldo;

    public Empleado(String nombre, double sueldo) {
        this.nombre = nombre;
        this.sueldo = sueldo;
    }

    // Metodo para Sobreescritura
    public String ObtenerDetelles() {
        return "Nombre: " + this.nombre + ", Sueldo: " + this.sueldo;
    }

    //Getters y Setters Sueldo
    public double getSueldo() {
        return sueldo;
    }
    public void setSueldo(double sueldo) {
        this.sueldo = sueldo;
    }

}
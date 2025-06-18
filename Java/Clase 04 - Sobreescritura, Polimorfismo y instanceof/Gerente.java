package Java;

public class Gerente extends Empleado {
    private String departamento;

    public Gerente(String nombre, double sueldo, String departamento) {
        super(nombre, sueldo);
        this.departamento = departamento;
    }

    // Sobreescritura del metodo ObtenerDetalles
    @Override
    public String ObtenerDetelles() {
        return super.ObtenerDetelles() + ", Departamento: " + this.departamento;
    }

    // Getters y Setters
    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
    
}
